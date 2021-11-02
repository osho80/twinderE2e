import httpService from './httpService';
import { makeId } from './utilService';


export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    addReaction,
    addPost,
    uploadImg,
    addImg
}

function getUsers(userPrefs) {
    const queryStr = `?city=${userPrefs.city}&minAge=${userPrefs.minAge}&maxAge=${userPrefs.maxAge}&gender=${userPrefs.gender}`;
    return httpService.get(`user/${queryStr}`);
}

function getById(userId) {
    return httpService.get(`user/${userId}`);
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

function update(user) {
    return httpService.put(`user/${user._id}`, user);
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred);
    return _handleLogin(user);
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}

async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}


function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

async function addReaction(loggedInUserId, targetUserId, reaction) {
    const newReaction = {
        id: makeId(4),
        to: targetUserId,
        type: reaction,
        timestamp: Date.now()
    }

    const data = { loggedInUserId, newReaction };

    return httpService.post('user/addreaction', data);
}

function addPost(loggedInUserId, postTxt) {
    return httpService.post('user/addpost', { loggedInUserId, postTxt });
}

function addImg(loggedInUserId, imgUrl) {
    return httpService.post('user/addimg', { loggedInUserId, imgUrl });
}

function uploadImg(file) {
    const CLOUD_NAME = 'ddavidson';
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const UPLOAD_PRESET = "wdyr4hpo";
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .catch(err => console.error(err))
}

