const { Channel, Message } = require('./db/models');

const addMessageToChannel = async (username, channel_id, message) => {
  console.log('inside addMessageToChannel function in utils.js... ');
  console.log('username: ', username);
  console.log('channel_id: ', channel_id)
  console.log('message: ', message)
  try {
    const channel = await Channel.findOne({
      where: {id:channel_id},
      attributes: ['id', 'name', 'server_id']
    });
    const newMessage = await Message.create({
      channel_id,
      username,
      message,
    });
    newMessage.setChannel(channel);
    await newMessage.save();
    console.log(newMessage)
    return newMessage;
  } catch (e) {
    console.error(e);
  }
};

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const handleErrors = async (err) => {
  if(err.status >= 400 && err.status < 600){
    const errRes = await err.json();
    const { errors } = errRes;
    if(erros && Array.isArray(errors)){
      
    }
  }
}



module.exports = {
  asyncHandler,
  addMessageToChannel
}