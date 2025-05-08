const { Router } = require("express");
const {
  getContacts,
  createContact,
} = require("../controllers/contactsController");

const router = Router();

router.get("/", getContacts);
router.post("/", createContact);
module.exports = router;
