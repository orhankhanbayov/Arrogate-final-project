const express = require('express');
const router = express.Router();

const RoutesController = require('../controllers/routes');

router.get('/', RoutesController.List);
router.post('/', RoutesController.Create);

module.exports = router;
