const express = require('express');
const gamesController = require("../controllers/games.controller");
const router = express.Router();

router.route("/games")
    .get(gamesController.getAll);
    
router.route("/games/create")
    .post(gamesController.createGame);

// colon(:) is variable/placeholder 
router.route("/games/:gameId") 
    .get(gamesController.getOne);

router.route("/games/update")
    .post(gamesController.updateGame);

router.route("/games/delete/:gameId")
    .get(gamesController.deleteGame);

module.exports = router;