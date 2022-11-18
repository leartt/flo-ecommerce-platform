const router = require("express").Router();

const AuthController = require("../../controllers/auth.controller");
const checkAuth = require("../../middlewares/check-auth.middleware");

router.post("/login", AuthController.handleLogin);
router.post("/me", checkAuth, AuthController.handleGetLoggedInUser);
router.post("/signup", AuthController.handleSignup);
router.post("/renew-token", AuthController.handleRenewToken);
router.delete("/logout", AuthController.handleLogout);
router.post("/forgot-password", AuthController.handleForgotPassword);
router.post("/reset-password", AuthController.handleResetPassword);

module.exports = router;
