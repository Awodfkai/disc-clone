const express = require('express');

const { Channel } = require('../../db/models');
const { asyncHandler } = require('../../utils');
const { authenticated } = require('../../auth');

const router = express.Router();

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