const express = require('express');
const usersController = require('../controllers/users.controller');
const router = express.Router();

router.route("/")
    .get(usersController.getAll)
    .post(usersController.addOne);

router.route("/login")
    .post(usersController.login);

module.exports = router;