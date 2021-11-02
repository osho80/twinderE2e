const dbService = require('../../services/db.service');
const userService = require('../user/user.service');
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    checkIfMatch,
    addMatch,
    openMatch,
    addMsg
}


async function query(loggedInUserId) {
    const collection = await dbService.getCollection('match')
    try {
        const matches = await collection.find({}).toArray();
        const userMatches = matches.filter(match => match.user1.id === loggedInUserId ||
            match.user2.id === loggedInUserId);
        return userMatches;
    } catch (err) {
        console.log('ERROR: cannot find matchs')
        throw err;
    }
}

async function checkIfMatch(loggedInUserId, targetUser) {
    const match = targetUser.reactions.find(reaction => reaction.to === `${loggedInUserId}` && reaction.type === 'like');
    return match;
}

async function getById(matchId) {
    const collection = await dbService.getCollection('match')
    try {
        const match = await collection.findOne({ "_id": ObjectId(matchId) })
        delete match.password
        return match
    } catch (err) {
        console.log(`ERROR: while finding match ${matchId}`)
        throw err;
    }
}

async function remove(matchId) {
    const collection = await dbService.getCollection('match')
    try {
        await collection.deleteOne({ "_id": ObjectId(matchId) })
    } catch (err) {
        console.log(`ERROR: cannot remove match ${matchId}`)
        throw err;
    }
}

async function update(match) {
    const collection = await dbService.getCollection('match')
    match._id = ObjectId(match._id);

    try {
        await collection.replaceOne({ "_id": match._id }, { $set: match })
        return match
    } catch (err) {
        console.log(`ERROR: cannot update match ${match._id}`)
        throw err;
    }
}

async function addMatch(loggedInUser, targetUser) {
    const miniLoggedUser = await createMiniUser(loggedInUser);
    const miniTargetUser = await createMiniUser(targetUser);
    const match = {
        user1: miniLoggedUser,
        user2: miniTargetUser,
        createdAt: Date.now(),
        msgs: []
    }
    const collection = await dbService.getCollection('match');
    try {
        await collection.insertOne(match);
        return match;
    } catch (err) {
        console.log(`ERROR: cannot insert match`)
        throw err;
    }
}

async function createMiniUser(user) {
    return {
        id: user._id + '',
        name: user.fullName,
        imageUrl: user.imagesUrls[0],
        isOpenNotification: false
    }
}

async function openMatch(loggedInUserId, matchId) {
    const match = await getById(matchId);
    for (let key in match) {
        if (key === 'user1' || key === 'user2') {
            if (match[key].id === loggedInUserId) {
                if (match[key].isOpenNotification) return match;
                else match[key].isOpenNotification = true;
            }
        }
    }
    await update(match)
    return match;
}


async function addMsg(loggedInUser, msgTxt, matchId) {
    const msg = {
        from: loggedInUser.fullName,
        userId: loggedInUser._id,
        txt: msgTxt,
        createdAt: Date.now()
    }
    const match = await getById(matchId);
    match.msgs.push(msg);
    await update(match);
    return msg;
}


