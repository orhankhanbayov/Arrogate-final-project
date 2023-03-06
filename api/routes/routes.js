const express = require('express');
const router = express.Router();

const RoutesController = require('../controllers/routes');
const Location = require('../models/location');

router.get('/', RoutesController.List);
router.post('/', RoutesController.Create);

module.exports = router;
