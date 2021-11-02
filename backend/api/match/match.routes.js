const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { getMatches, deleteMatch, updateMatch, getMatch, openMatch, addMsg } = require('./match.controller');
const router = express.Router();

router.get('/', getMatches);
router.get('/:id', getMatch);
router.put('/:id', requireAuth, updateMatch);
router.post('/openmatch', requireAuth, openMatch);
router.post('/addMsg', requireAuth, addMsg);
router.delete('/:id', requireAuth, requireAdmin, deleteMatch);

module.exports = router;