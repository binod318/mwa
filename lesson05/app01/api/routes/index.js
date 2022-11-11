const express = require('express');
const gamesController = require("../controllers/games.controller");
const usersController = require('../controllers/users.controller');
const router = express.Router();

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne);

// colon(:) is variable/placeholder 
router.route("/games/:gameId") 
    .get(gamesController.getOne)
    .put(gamesController.updateOne)
    .patch(gamesController.partialUpdateOne)
    .delete(gamesController.deleteGame);

router.route("/users")
    .get(usersController.getAll)
    .post(usersController.addOne);

router.route("/users/login")
    .post(usersController.login);

module.exports = router;