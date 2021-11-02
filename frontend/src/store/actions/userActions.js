import { userService } from '../../services/userService';
import socketService from '../../services/socketService';

export function loadUsers(userPrefs) {
    return async dispatch => {
        try {
            const users = await userService.getUsers(userPrefs);
            dispatch(_setUsers(users));
        } catch (err) {
            console.log('userActions: err in loadUsers', err);
        }
    }
}

export function loadUser(userId) {
    return async dispatch => {
        try {
            const user = await userService.getById(userId);
            dispatch(_setUser(user));
        } catch (err) {
            console.log('userActions: err in loadUser', err);
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId);
            dispatch(_removeUser(userId));
        } catch (err) {
            console.log('userActions: err in removeUser', err);
        }
    }
}

export function updateUser(user) {
    return async dispatch => {
        try {
            await userService.update(user);
            dispatch(_updateUser(user));
        } catch (err) {
            console.log('userActions: err in updateUser', err);
        }
    }
}

export function login(userCreds) {
    return async dispatch => {
        const user = await userService.login(userCreds);
        dispatch(_setLoggedInUser(user));
    }
}
export function setLoggedinUser(user) {
    return dispatch => {
        sessionStorage.setItem('user', JSON.stringify(user))
        dispatch(_setLoggedInUser(user));
    }
}



export function updateLoggedInUser(user) {
    return async dispatch => {
        try {
            await userService.update(user);
            sessionStorage.setItem('user', JSON.stringify(user))
            dispatch(_updateloggedInUser(user));
        } catch (err) {
            console.log('userActions: err in updateLoggedInUser', err);
        }
    }
}


export function signup(userCreds) {
    return async dispatch => {
        const user = await userService.signup(userCreds);
        dispatch(_setLoggedInUser(user));
    }
}

export function logout() {
    socketService.killSocket();
    return async dispatch => {
        await userService.logout();
        dispatch(_removeloggedInUser(null));
    }
}

export function addReaction(loggedInUserId, targetUserId, reaction) {
    return async dispatch => {
        try {
            const newReaction = await userService.addReaction(loggedInUserId, targetUserId, reaction);
            if (reaction === 'like') socketService.emit('check match', newReaction);
            dispatch(_addReaction(newReaction))
        } catch (err) {
            console.log('userActions: err in addReaction', err);
        }
    }
}

export function addPost(loggedInUserId, postTxt) {
    return async dispatch => {
        try {
            const post = await userService.addPost(loggedInUserId, postTxt);
            socketService.emit('user added post', {loggedInUserId});
            dispatch(_addPost(post));
        } catch (err) {
            console.log('userActions: err in addPost', err);
        }
    }
}


export function addImgProfile(loggedInUserId, imgUrl) {
    return async dispatch => {
        try {
            await userService.addImg(loggedInUserId, imgUrl);
            dispatch(_addImg(imgUrl));
        } catch (err) {
            console.log('userActions: err in addImgProfile', err);
        }
    }
}

export function activeBgScreen() {
    return async dispatch => {
        try {
            dispatch(_activeBgScreen());
        } catch (err) {
            console.log('userActions: err in activeBgScreen', err);
        }
    }
}

export function closeBgScreen() {
    return async dispatch => {
        try {
            dispatch(_closeBgScreen());
        } catch (err) {
            console.log('userActions: err in closeBgScreen', err);
        }
    }
}

function _setLoggedInUser(user) {
    return { type: 'SET_LOGGEDIN_USER', user }
}

function _removeloggedInUser() {
    return { type: 'LOGGEDIN_USER_REMOVE' }
}

function _updateloggedInUser(user) {
    return { type: 'LOGGEDIN_USER_UPDATE', user }
}

function _setUser(user) {
    return { type: 'SET_USER', user }
}

function _setUsers(users) {
    return { type: 'SET_USERS', users }
}

function _removeUser(userId) {
    return { type: 'REMOVE_USER', userId }
}

function _updateUser(user) {
    return { type: 'UPDATE_USER', user }
}

function _addReaction(newReaction) {
    return { type: 'ADD_REACTIONS', newReaction }
}

function _addPost(post) {
    return { type: 'ADD_POST', post }
}

function _addImg(img) {
    return { type: 'ADD_USER_IMG', img }
}

function _activeBgScreen() {
    return { type: 'ACTIVE_BG_SCREEN' }
}

function _closeBgScreen() {
    return { type: 'CLOSE_BG_SCREEN' }
}
