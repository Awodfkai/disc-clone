const jwt = require("jsonwebtoken");
const bearerToken = require('express-bearer-token');
const uuid = require('uuid').v4;

const { jwtConfig: {secret, expiresIn} } = require('./config/index');
const { User } = require('./db/models');

function generateToken(user) {
  const data = {
    id: user.id,
  };
  const jwtid = uuid();

  return {
    jti: jwtid,
    token: jwt.sign({ data }, secret, { expiresIn: Number.parseInt(expiresIn), jwtid })
  };
}

function restoreUser(req, res, next) {
  console.log('checking token')
  const { token } = req;

  if (!token) {
    return next({ status: 401, message: 'no token' });
  }

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (err) {
      err.status = 403;
      return next(err);
    }

    const tokenId = payload.jti;
    console.log('tokenId in auth.js: ', tokenId)

    try {
      req.user = await User.findOne( {where: {tokenId}});
    } catch (e) {
      return next(e);
    }

    if (!req.user) {
      return next({ status: 404, message: 'session not found' });
    }

    next();
  });
}

const authenticated = [bearerToken(), restoreUser];


module.exports = {
  generateToken,
  authenticated,
}