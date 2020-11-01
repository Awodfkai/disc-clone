const express = require('express');

const { Channel, Message } = require('../../db/models');
const { asyncHandler } = require('../../utils');
const { authenticated } = require('../../auth');

const router = express.Router();

router.get(
  '/:id/messages',
  asyncHandler(async (req, res, next) => {
    const channel_id = req.params.id;
    const messages = await Message.findAll({
      where: {channel_id},
      order: [
        ['createdAt', 'ASC']
      ],
    })
    res.status(200).json(messages)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const server_id = req.params.id
    const channels = await Channel.findAll({
      where: {server_id},
      attributes: ['id', 'name']
    })
    res.status(200).json(channels)
  })
)
  
router.post(
  '/create',
  authenticated,
  asyncHandler(async (req, res, next) => {
    console.log('made it into the post route for channel create')
    const { name, server_id } = req.body;
    const channel = await Channel.create({
      name, server_id
    });
    res.status(201).json(channel)
  })
)

router.delete(
  '/:id',
  authenticated,
  asyncHandler(async (req, res, next) => {
    await Channel.destroy({ id: req.params.id })
  })
)

module.exports = router;