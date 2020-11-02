const express = require('express');

const { Server, ServerMember, User } = require('../../db/models');
const { asyncHandler } = require('../../utils');
const { authenticated } = require('../../auth');

const router = express.Router();

router.get(
  '/:id',
  authenticated,
  asyncHandler(async (req, res, next) => {
    const user_id = req.params.id
    const serverMemberships = await ServerMember.findAll({
      where: {user_id}
    });
    const serverIds = []
    for(let i=0;i<serverMemberships.length;i++){
      serverMember = serverMemberships[i];
      serverIds.push(serverMember.dataValues.server_id);
    }
    const servers = await Server.findAll({
      where: {id: serverIds}
    })
    res.status(200).json(servers)
  })
)

router.post(
  '/server/:id/user/:username',
  asyncHandler(async (req, res, next) => {
    const username = req.params.username;
    const server_id = req.params.id;
    const user = await User.findOne({
      where: {username},
    });
    await ServerMember.create({
      server_id,
      user_id: user.id,
      role_id: 2,
    })
    res.status(201)
  })
)

module.exports = router;