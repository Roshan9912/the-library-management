const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const member = require("../controllers/memberController");

router.get("/", auth, role("librarian"), member.getMembers);
router.delete("/:id", auth, role("librarian"), idValidation, validate, member.deleteMember);
router.get("/me/books", auth, role("member"), member.myBooks);

module.exports = router;