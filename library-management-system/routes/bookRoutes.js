const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const book = require("../controllers/bookController");
const { bookValidation, idValidation, validate } = require("../validators/validationRules");

router.post("/", auth, role("librarian"), bookValidation, validate, book.addBook);
router.get("/", auth, book.getBooks);
router.get("/:id", auth, idValidation, validate, book.getBook);
router.put("/:id", auth, role("librarian"), idValidation, bookValidation, validate, book.updateBook);
router.delete("/:id", auth, role("librarian"), idValidation, validate, book.deleteBook);
router.post("/:id/borrow", auth, role("member"), idValidation, validate, book.borrowBook);
router.post("/:id/return", auth, role("member"), idValidation, validate, book.returnBook);

module.exports = router;