const { Router } = require("express");
const { getMessages } = require("../controllers/messagesController");
const router = Router();

router.get("/:conversationId", getMessages);

module.exports = router;
