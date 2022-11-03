const express = require('express');
const myController = require('../controllers/myController'); 
const router = express.Router();

router.route("/:numerator")
    .get(myController.getResult);

//default routing to give message
router.route("*")
    .get(myController.defaultResult);

module.exports = router;