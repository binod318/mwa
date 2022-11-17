const express = require('express');
const gamesController = require("../controllers/games.controller");
const router = express.Router();

router.route("/")
    .get(gamesController.getAll)
    .post(gamesController.addOne);

// colon(:) is variable/placeholder 
router.route("/:gameId") 
    .get(gamesController.getOne)
    .put(gamesController.updateOne)
    .patch(gamesController.partialUpdateOne)
    .delete(gamesController.deleteGame);

module.exports = router;