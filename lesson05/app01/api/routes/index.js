const express = require('express');
const gamesRoute = require('./games');
const usersRoute = require('./users');
const router = express.Router();

router.use('/games', gamesRoute);
router.use('/users', usersRoute);

module.exports = router;