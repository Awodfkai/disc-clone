const jwt = require("jsonwebtoken");

const { jwtConfig: {secret, expiresIn} } = require('./config/index');
const { User } = require('./db/models');

const getUserToken = (user) => {
  const userData = {
    id: user.id,
    username: user.username,
  }
  const token = jwt.sign({ data: userData }, secret, { expiresIn: parseInt(expiresIn, 10),})
  return token;
}

const checkUserToken = (req, res, next) => {
  console.log('checking user token ...')
  const {token} = req;
  if(!token){
    req.user = null;
    return next({status:401, message: 'no token'});
  }
  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if(err) {
      err.status = 403;
      return next(err);
    }
    const { id } = jwtPayload.data;
    try{
      req.user = await User.findByPk(id);
    } catch(e){
      return next(e);
    }
    next();
  })
}

module.exports = {
  getUserToken,
  checkUserToken,
}