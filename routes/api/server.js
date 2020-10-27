const express = require('express');

const { Server } = require('../../db/models');
const { asyncHandler } = require('../../utils');
const { checkUserToken } = require('../../auth');
const auth = require('../../auth');

const router = express.Router();

router.post(
  '/create',
  checkUserToken,
  asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const server = await Server.create({
      name,
    });
    res.status(201)
  })
)

router.delete(
  '/:id',
  checkUserToken,
  asyncHandler(async (req, res, next) => {
    await Server.destroy({id:req.params.id})
  })
)

module.exports = router;