const { Router } = require("express");
const router = Router();
const { getUsers } = require("../controllers/usersController");
router.get("/", getUsers);

module.exports = router;
