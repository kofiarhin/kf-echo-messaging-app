const { Router } = require("express");
const {
  loginController,
  registerController,
  logoutController,
} = require("../controllers/authController");

const router = Router();
// @path /api/auth/login
// @public
router.post("/login", loginController);
router.post("/register", registerController);
router.get("/logout", logoutController);

module.exports = router;
