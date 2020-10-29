const express = require("express");
const bcrypt = require("bcryptjs");

const { User } = require("../../db/models");
const { asyncHandler, checkUsername } = require("../../utils");
const { generateToken, authenticated } = require('../../auth');
const user = require("../../db/models/user");

const router = express.Router();

router.post(
  "/sign-up",
  asyncHandler(async (req, res, next) => {
    const {username, password} = req.body;
    const usernameExists = await User.findOne({ where: {username}})
    if(usernameExists){
      const err = new Error("Sign-up failed")
      err.status = 409;
      err.title = 'Sign-up failed'
      err.errors = ['Username not available']
      return next(err);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    const { jti, token } = generateToken(user);
    user.tokenId = jti;
    await user.save();

    res.cookie("auth-token", token);
    res.status(201).json({
      user: {id: user.id},
      token,
    });
  })
)

router.get(
  '/log-in',
  asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const userExists = await User.findOne({where:{username}});
    if(!userExists || !bcrypt.compareSync(password, user.password.toString())){
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login Failed';
      err.errors = ['Invalid credential provided'];
      return next(err);
    }
    const token = generateToken(userExists);
    res.cookie('auth-token', token);
    res.status(201).json({
      user: {id: userExists.id},
      token,
    })
  })
)

router.get(
  '/log-out',
  asyncHandler(async (req, res, next) => {
    res.clearCookie('auth-token');
    res.status(200);
    res.json('logged out');
  })
)

router.post(
  '/edit',
  asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.body.id);
    await user.update(req.body)
    res.status(201).json(user);
  })
)

module.exports = router;