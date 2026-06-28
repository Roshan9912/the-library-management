const { body, validationResult, param } = require("express-validator");

exports.registerValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

exports.loginValidation = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
];

exports.bookValidation = [
    body("title").notEmpty().withMessage("Title is required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("isbn").notEmpty().withMessage("ISBN is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("quantity").isInt({ min: 0 }).withMessage("Quantity cannot be negative"),
    body("availableQuantity").isInt({ min: 0 }).withMessage("Available quantity cannot be negative"),
];

exports.idValidation = [
    param("id").isMongoId().withMessage("Invalid ID format"),
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg 
        });
    }
    next();
};