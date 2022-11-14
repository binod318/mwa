const express = require('express');
const jobsController = require('../controllers/jobsControllers');

const router = express.Router();

router.route('/jobs')
    .get(jobsController.getAll)
    .post(jobsController.addOne);

router.route('/jobs/:jobId')
    .get(jobsController.getOne)
    .delete(jobsController.deleteOne);

module.exports = router;