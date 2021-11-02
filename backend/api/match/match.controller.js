const matchService = require('./match.service')
const logger = require('../../services/logger.service')

async function getMatch(req, res) {
    const match = await matchService.getById(req.params.id)
    res.json(match)
}
  
async function getMatches(req, res) {
    const matchs = await matchService.query(req.query.loggedInUserId)
    logger.debug(matchs);
    res.json(matchs);
}

async function deleteMatch(req, res) {
    await matchService.remove(req.params.id)
    res.end()
}

async function updateMatch(req, res) {
    const match = req.body;
    await matchService.update(match)
    res.send(match)
}

async function openMatch (req, res) {
    const {loggedInUserId, matchId} = req.body;
    const match = await matchService.openMatch(loggedInUserId, matchId);
    res.json(match);
}

async function addMsg (req, res) {
    const {loggedInUser, msgTxt, matchId} = req.body;
    const msg = await matchService.addMsg(loggedInUser, msgTxt, matchId);
    res.json(msg);
}

module.exports = {
    getMatches,
    getMatch,
    deleteMatch,
    updateMatch,
    openMatch,
    addMsg
}