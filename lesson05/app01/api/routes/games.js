const express = require('express');
const gamesController = require("../controllers/games.controller");
const authenticationController = require("../controllers/authentication.controller");
const router = express.Router();

router.route("/")
    .get(authenticationController.authenticate, gamesController.getAll)
    .post(gamesController.addOne);

// colon(:) is variable/placeholder 
router.route("/:gameId") 
    .get(authenticationController.authenticate, gamesController.getOne)
    .put(gamesController.updateOne)
    .patch(gamesController.partialUpdateOne)
    .delete(gamesController.deleteGame);

module.exports = router;