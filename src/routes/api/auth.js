const router = require("express").Router();

const AuthController = require("../../controllers/auth.controller");

router.post("/login", AuthController.handleLogin);
router.post("/signup", AuthController.handleSignup);
router.post("/renew-token", AuthController.handleRenewToken);

module.exports = router;
