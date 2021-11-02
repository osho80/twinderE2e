const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}

async function getUsers(req, res) {
    const users = await userService.query(req.query)
    logger.debug(users);
    res.send(users)
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.end()
}

async function updateUser(req, res) {
    const user = req.body;
    await userService.update(user)
    res.send(user)
}

async function addImg(req, res) {
    const { loggedInUserId, imgUrl } = req.body;
    await userService.addImg(loggedInUserId, imgUrl);
    res.send();
}

async function addPost(req, res) {
    const { loggedInUserId, postTxt } = req.body;
    const post = await userService.addPost(loggedInUserId, postTxt);
    res.json(post);
}

async function addReaction(req, res) {
    const { loggedInUserId, newReaction } = req.body;
    await userService.addReaction(loggedInUserId, newReaction);
    res.json(newReaction);
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    addPost,
    addReaction,
    addImg
}