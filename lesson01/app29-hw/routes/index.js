const express = require('express');
const schoolController = require('../controllers/schoolController'); 
const router = express.Router();

//route for /student - url parameters and form data
router.route("/students")
    .get(schoolController.getAll)
    .post(schoolController.addStudent);

//route for /student/one?id=2 - query string type
router.route("/students/one")
.get(schoolController.getOneUsingQS);

//route for /student/2
router.route("/students/:studentId")
    .get(schoolController.getOne);

module.exports = router;