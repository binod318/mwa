const express = require('express');
const myController = require('../controller/myController'); 
const router = express.Router();

router.route("/games")
    .get(myController.getResult);

module.exports = router;