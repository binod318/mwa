const express = require('express');
const moviesController = require('../controllers/moviesController');
const router = express.Router();

router.route('/movies')
    .get(moviesController.getAll);

router.route('/movies/:movieId')
    .get(moviesController.getOne)
    .delete(moviesController.deleteOne);

module.exports = router;