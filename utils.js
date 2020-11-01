const { Channel, Message } = require('./db/models');

const addMessageToChannel = async (user_id, channel_id, message) => {
  console.log(channelId, message);
  try {
    const channel = await Channel.findByPk(channel_id);
    const message = await Message.create({
      channel_id,
      user_id,
      message
    });
    message.setChannel(channel);
    await message.save();
    return {
      message,
      channel: await message.getChannel()
    }
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