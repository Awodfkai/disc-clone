const express = require('express');

const { Server, ServerMember } = require('../../db/models');
const { asyncHandler } = require('../../utils');
const { authenticated } = require('../../auth');

const router = express.Router();

router.post(
  '/create',
  authenticated,
  asyncHandler(async (req, res, next) => {
    console.log('made it into the post route for server create')
    const { name, user } = req.body;
    const server = await Server.create({
      name,
    });
    await ServerMember.create({
      server_id: server.id,
      user_id: user.id,
      role_id: 1,
    })
    res.status(201).json(server)
  })
)

router.post(
  '/:id/join',
  authenticated,
  asyncHandler(async (req, res, next) => {
    const server_id = req.params.id;
    console.log('made it into the post route for server create')
    const { user } = req.body;
    await ServerMember.create({
      server_id,
      user_id: user.id,
      role_id: 2,
    })
    res.status(201).json(server)
  })
)

router.delete(
  '/:id',
  authenticated,
  asyncHandler(async (req, res, next) => {
    await Server.destroy({id:req.params.id})
  })
)

module.exports = router;