#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('starter:server');
const { addMessageToChannel } = require('../utils')
const { Channel } = require('../db/models')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', async (socket) => {
  console.log(`${socket.id} -- Connected`);

  socket.on('join', async (channelId) => {
    const channel = await Channel.findByPk(channelId);
    if (channel) {
      socket.join(channel.id, async () => {
        console.log(`${socket.id} has joined ${channel.name}`);
      });
    }
  });

  socket.on('leave', async (channelId) => {
    const channel = await Channel.findByPk(channelId, {
      attributes: ['id', 'name']
    });
    if (channel) {
      socket.leave(channel.id, async () => {
        console.log(`${socket.id} has left ${channel.name}`);
      });
    }
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
  })

  const channels = await Channel.findAll({
    attributes: ['id', 'name']
  });
  for (let channel of channels) {
    console.log(`listening for messages from ${channel.name}`)
    socket.on(channel.id, async ({ message, username }) => {
      const newMessage = await addMessageToChannel(username, channel.id, message);
      console.log('message in www.js: ', newMessage)
      socket.to(channel.id).emit(channel.id, newMessage);
      socket.emit(channel.id, newMessage);
    })
  }

})

// const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

const server = http.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
