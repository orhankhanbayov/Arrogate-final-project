const express = require('express');
const router = express.Router();

const AccountController = require('../controllers/account');

router.get('/', AccountController.getScore);
router.post('/', AccountController.updateScore);
router.post('/edit', AccountController.Edit);

module.exports = router;
