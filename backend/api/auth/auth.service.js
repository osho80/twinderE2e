const bcrypt = require('bcryptjs')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10;

async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`)
    if (!email || !password) return Promise.reject('email and password are required!')

    const user = await userService.getByEmail(email);
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')

    delete user.password;
    return user;
}

async function signup(fullName, gender, city, age, email, password, imagesUrls, userPrefs) {
    logger.debug(`auth.service - signup with full name: ${fullName}, gender: ${gender}, city:
    ${city}, age: ${age}, email: ${email}, password: ${password}, imgUrls: ${imagesUrls}, userPrefs: ${userPrefs}`);
    if (!fullName || !gender || !city || !age, !email || !password || !imagesUrls || !userPrefs) return Promise.reject('fullName, gender, city, email, userPrefs and password are required!')

    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({ fullName, gender, city, age, email, password: hash, imagesUrls, userPrefs });
}

module.exports = {
    signup,
    login,
}