import { matchService } from '../../services/matchService';

export function loadMatches(loggedInUserId) {
    return async dispatch => {
        try {
            const matchesResived = await matchService.getMatches(loggedInUserId);
            const matches = matchesResived.reverse();
            dispatch(_setMatchs(matches));
        } catch (err) {
            console.log('matchActions: err in loadMatches', err);
        }
    }
}

export function loadMatch(matchId) {
    return async dispatch => {
        try {
            const match = await matchService.getById(matchId);
            dispatch(_setMatch(match));
        } catch (err) {
            console.log('matchActions: err in loadMatch', err);
        }
    }
}

export function removeMatch(matchId) {
    return async dispatch => {
        try {
            await matchService.remove(matchId);
            dispatch(_removeMatch(matchId));
        } catch (err) {
            console.log('matchActions: err in removeMatch', err);
        }
    }
}

export function updateMatch(match) {
    return async dispatch => {
        try {
            await matchService.update(match);
            dispatch(_updateMatch(match));
        } catch (err) {
            console.log('matchActions: err in updateMatch', err);
        }
    }
}

export function addMatch(match) {
    return async dispatch => {
        try {
            dispatch(_addMatch(match));
        } catch (err) {
            console.log('matchActions: err in addMatch', err);
        }
    }
}

export function openMatch(loggedInUserId, matchId) {
    return async dispatch => {
        try {
            const match = await matchService.openMatch(loggedInUserId, matchId);
            dispatch(_updateMatch(match));
        } catch (err) {
            console.log('matchActions: err in openMatch', err);
        }
    }
}

export function closeChat() {
    return async dispatch => {
        try {
            dispatch(_closeMatchChat())
        } catch (err) {
            console.log('matchActions: err in closeChat', err);
        }
    }
}

export function addMsg(loggedInUser, msgTxt, matchId) {
    return async dispatch => {
        try {
            const msg = await matchService.addMsg(loggedInUser, msgTxt, matchId);
            dispatch(_addMsg(msg, matchId));
        } catch (err) {
            console.log('matchActions: err in addMsg', err);
        }
    }
}


function _setMatchs(matches) {
    return { type: 'SET_MATCHES', matches }
}

export function _addNewMatchNotifiction() {
    return { type: 'ADD_NEW_MATCH_NOTIFY' }
}

function _setMatch(match) {
    return { type: 'SET_MATCH', match }
}

function _removeMatch(matchId) {
    return { type: 'MATCH_REMOVE', matchId }
}

function _updateMatch(match) {
    return { type: 'UPDATE_MATCH', match }
}
function _addMatch(match) {
    return { type: 'MATCH_ADD', match }
}

function _closeMatchChat() {
    return { type: 'CLOSE_CHAT'}
}

function _addMsg(msg, matchId) {
    const data = {msg, matchId}
    return { type: 'MSG_ADD', data }
}

