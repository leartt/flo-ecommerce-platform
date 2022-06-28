const router = require("express").Router();

const AuthController = require("../../controllers/auth.controller");

router.post("/login", AuthController.handleLogin);
router.post("/signup", AuthController.handleSignup);

module.exports = router;
