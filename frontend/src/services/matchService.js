import httpService from '../services/httpService';
export const matchService = {
    getMatches,
    getById,
    openMatch,
    addMsg
}


function getMatches(loggedInUserId) {
    const queryStr = `?loggedInUserId=${loggedInUserId}`;
    return httpService.get(`match/${queryStr}`);
}

function getById(matchId) {
    return httpService.get(`match/${matchId}`);
}

function openMatch (loggedInUserId, matchId) {
    return httpService.post('match/openmatch', {loggedInUserId, matchId});
}

function addMsg (loggedInUser, msgTxt, matchId) {
    return httpService.post('match/addMsg', {loggedInUser, msgTxt, matchId});
}

