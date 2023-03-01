const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("https://mystery-route-backend.onrender.com/users", UsersController.Create);
router.post("https://mystery-route-backend.onrender.com/users/login", UsersController.Login)


module.exports = router;
