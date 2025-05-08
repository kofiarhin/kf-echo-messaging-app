const { Router } = require("express");
const {
  getUserConversations,
} = require("../controllers/conversationController");

const router = Router();

router.get("/:userId", getUserConversations);
module.exports = router;
