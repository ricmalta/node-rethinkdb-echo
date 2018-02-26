'use strict';

const _ = require('lodash');
const log = require('./logger').log('socket.io');
const models = require('./models');
const broker = require('./broker');

// this is a business level abstration of the sockets.
module.exports = (server, callback) => {
  let io;
  try {
    // init socket.io
    io = require('socket.io').listen(server);
  } catch (e) {
    log.error(e);
    return callback(e);
  }
  const startMessages = (socket, room = 'public') => {
    models.messages.list(room, (err, messages) => {
      if (err) {
        log.error(err);
        return;
      }
      let messagesByGroup = _.groupBy(messages, 'Room');
      for (let room in messagesByGroup) {
        io.to(socket.id).emit('messages', messagesByGroup[room].map((m) => { return m; }));
      }
    });
  };
  // everytime someone connects:
  //  1. join the public room (private rooms perfectly possible).
  //  2. receive the last few messages in the public channel.
  io.on('connection', (socket) => {
    // socket.join('public');
    log.info(socket.id, 'connected');

    socket.on('enter', (room) => {
      log.info(socket.id, `joined room "${room}"`);
      socket.join(room || 'public');
      startMessages(socket, room);
    });
  });

  // listen to every message send.
  broker.on('message', (data) => {
    log.info(`message to ${data.room} channel: ${data.message.Text}`);
    io.to(data.room).emit('messages', data.message);
  });

  return callback(null, io);
};
