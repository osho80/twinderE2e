import io from 'socket.io-client';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/' : '//localhost:3030';

let socket;

export default {
  setup,
  terminate,
  on,
  off,
  emit,
  runSockets,
  killSocket
};

function setup() {
  socket = io(BASE_URL);
}

function terminate() {
  socket = null;
}

function on(eventName, cb) {
  socket.on(eventName, cb);
}

function off(eventName, cb) {
  socket.off(eventName, cb);
}

function emit(eventName, data) {
  socket.emit(eventName, data);
}

function runSockets(user) {
  setup();
  emit('login', user);
}


function killSocket() {
  off('new match');
  off('check match');
  off('sending msg');
  off('user added post');
  off('post added');
  terminate();
}
