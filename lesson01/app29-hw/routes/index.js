const express = require('express');
const schoolController = require('../controllers/schoolController'); 
const router = express.Router();

//route for /student
router.route("/students")
    .get(schoolController.getAll);

//route for /student/2
router.route("/students/:studentId")
    .get(schoolController.getOne);

module.exports = router;