const express = require('express');
const router = express.Router();

const RoutesController = require('../controllers/routes');

router.get('/', RoutesController.List);

module.exports = router;
