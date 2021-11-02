const socketMap = {}

module.exports = { bindUser, socketMap }


function bindUser(socket) {
    socketMap[socket.userId] = socket;
}
