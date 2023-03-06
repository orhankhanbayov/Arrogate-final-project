const express = require('express');
const router = express.Router();

const LocationController = require('../controllers/locations');

router.post('/', LocationController.Create);

module.exports = router;
