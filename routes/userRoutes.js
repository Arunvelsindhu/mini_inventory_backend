const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.post("/login", (req, res, next) => {
    console.log("🔥 LOGIN ROUTE HIT");
    next();
}, userController.loginUser);

module.exports = router;