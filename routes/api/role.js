const express = require('express');

const { Role } = require('../../db/models');
const { asyncHandler } = require('../../utils');
const { authenticated } = require('../../auth');

const router = express.Router();

router.post(
  '/create',
  authenticated,
  asyncHandler(async (req, res, next) => {
    console.log('made it into the post route for role create')
    const { name, invite, ban, kick, admin } = req.body;
    const role = await Role.create({
      name, invite, ban, kick, admin,
    });
    res.status(201).json(role)
  })
)

router.delete(
  '/:id',
  authenticated,
  asyncHandler(async (req, res, next) => {
    await Role.destroy({ id: req.params.id })
  })
)

module.exports = router;