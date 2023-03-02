const express = require("express");
const router = express.Router();

const TokensController = require("../controllers/tokens");

router.post("https://mystery-route-backend.onrender.com/tokens", TokensController.Create);

module.exports = router;
