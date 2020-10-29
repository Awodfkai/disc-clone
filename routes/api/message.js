const express = require('express');

const { Message } = require('../../db/models');
const { asyncHandler } = require('../../utils');
const { authenticated } = require('../../auth');

const router = express.Router();

router.post(
  '/create',
  authenticated,
  asyncHandler(async (req, res, next) => {
    console.log('post route for message create')
    const { channel_id, user_id, message } = req.body;
    const message = await  Message.create({
      channel_id, user_id, message
    });
    res.status(201).json(message)
  })
)

router.delete(
  '/:id',
  authenticated,
  asyncHandler(async (req, res, next) => {
    await Message.destroy({ id: req.params.id })
  })
)

module.exports = router;