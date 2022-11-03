const express = require('express');
const gamesController = require("../controllers/games.controller");
const router = express.Router();

router.route("/games")
    .get(gamesController.getAll);
    

router.route("/games/:gameId") // colon(:) is variable/placeholder 
    .get(gamesController.getOne);


module.exports = router;