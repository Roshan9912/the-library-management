const router = require("express").Router();
const auth = require("../controllers/authController");
const { registerValidation, loginValidation, validate } = require("../validators/validationRules");

router.post("/register", registerValidation, validate, auth.register);
router.post("/login", loginValidation, validate, auth.login);

module.exports = router;