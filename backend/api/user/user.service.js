const dbService = require('../../services/db.service');
const utilService = require('./util.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    getByEmail,
    update,
    remove,
    add,
    addPost,
    addReaction,
    addImg
}

async function query(filterBy) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find(criteria).toArray();
        users.forEach(user => delete user.password);
        return users;
    } catch (err) {
        console.log('ERROR: cannot find users');
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({ "_id": ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);

    try {
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    user.joinedAt = Date.now();
    user.isAdmin = false;
    user.posts = [];
    user.reactions = [];
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

async function addPost(loggedInUserId, postTxt) {
    const post = {
        id: utilService.makeId(3),
        txt: postTxt,
        createdAt: Date.now()
    }

    const user = await getById(loggedInUserId);
    user.posts.unshift(post);
    await update(user);
    return post;
}


async function addReaction(loggedInUserId, newReaction) {
    const user = await getById(loggedInUserId);
    user.reactions.push(newReaction);
    await update(user);
    return newReaction;
}


async function addImg(loggedInUserId, imgUrl) {
    const user = await getById(loggedInUserId);
    user.imagesUrls.unshift(imgUrl);
    await update(user);
}


function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.city) {
        criteria.city = filterBy.city;
    }
    if (filterBy.minAge) {
        criteria.age = { $gte: +filterBy.minAge, $lte: +filterBy.maxAge }
    }
    if (filterBy.gender) {
        criteria.gender = filterBy.gender;
    }
    return criteria;
}


