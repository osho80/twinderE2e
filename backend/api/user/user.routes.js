const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser, addPost, addReaction, addImg } = require('./user.controller')
const router = express.Router()



router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', requireAuth, updateUser)
router.post('/addpost', requireAuth, addPost)
router.post('/addimg', requireAuth, addImg)
router.post('/addreaction', requireAuth, addReaction)
router.delete('/:id', requireAuth, requireAdmin, deleteUser)

module.exports = router;