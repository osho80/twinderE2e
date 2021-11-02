const socketService = require('./socket.service');
const userService = require('../user/user.service');
const matchService = require('../match/match.service');

module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('login', user => {
            socket.userId = user._id;
            socketService.bindUser(socket)
        })
        socket.on('check match', async (newReaction) => {
            const loggedInUserId = socket.userId;
            const targetUser = await userService.getById(newReaction.to);
            const isMatch = await matchService.checkIfMatch(loggedInUserId, targetUser);
            if (isMatch) {
                const loggedInUser = await userService.getById(loggedInUserId)
                const match = await matchService.addMatch(loggedInUser, targetUser);
                socket.emit('new match', match);
                const targetUserSocket = socketService.socketMap[targetUser._id]
                if (targetUserSocket) {
                    targetUserSocket.emit('new match', match);
                }
            }
        })
        socket.on('open match', async ({matchId}) => {
            const loggedInUserId = socket.userId;
            await matchService.openMatch(loggedInUserId, matchId);
        })
        socket.on('chat newMsg', async ({ targetUserId }) => {
            const targetUserSocket = socketService.socketMap[targetUserId]
            if (targetUserSocket) {
                targetUserSocket.emit('new msg')
            }
        });
        socket.on('user added post', ({loggedInUserId}) => {
            const userId = loggedInUserId;
            const socketMap = socketService.socketMap;
            for (let key in socketMap) {
                if (socketMap[key]) socketMap[key].emit('post added', {userId});
            }
        });
    })
}