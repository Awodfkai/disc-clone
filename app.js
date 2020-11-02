const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const expressBearerToken = require('express-bearer-token')
const { Channel } = require('./db/models')
const { addMessageToChannel } = require('./utils')
const { port } = require('./config')

const { jwtConfig: {secret} } = require('./config')

const routes = require('./routes');

const app = express();

// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

app.use(express.json());
app.use(cors());
app.use(cookieParser(secret));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(function (err, _req, res, _next) {
  res.status(err.status || 500);
  if (err.status === 401) {
    res.set('WWW-Authenticate', 'Bearer');
  }
  res.json({
    message: err.message,
    error: JSON.parse(JSON.stringify(err)),
  });
});

// io.on('connection', async (socket) => {
//   console.log(`${socket.id} -- Connected`);

//   socket.on('join', async (channelId) => {
//     const channel = await Channel.findByPk(channelId);
//     if(channel){
//       socket.join(channel.id, async () => {
//         console.log(`${socket.id} has joined ${channel.name}`);
//       });
//     }
//   });

//   socket.on('leave', async (channelId) => {
//     const channel = await Channel.findByPk(channelId);
//     if (channel) {
//       socket.leave(channel.id, async () => {
//         console.log(`${socket.id} has left ${channel.name}`);
//       });
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log(`${socket.id} disconnected`)
//   })

//   const channels = await Channel.findAll();
//   for(let channel of channels){
//     socket.on(channel.id, async({message, user_id}) => {
//       const newMessage = await addMessageToChannel(user_id, channel.id, message);
//       socket.to(channel.id).emit(channel.id, newMessage);
//       socket.emit(channel.id, newMessage);
//     })
//   }

// })

// const server = http.listen(port, function(){
//   console.log(`server listening on port ${port}`)
// });

module.exports = app;
