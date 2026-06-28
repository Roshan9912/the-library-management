const Book = require("../models/Book");
const Borrow = require("../models/Borrow");

exports.addBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({ success: true, book });
    } catch (err) {
        next(err);
    }
};

exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json({ success: true, books });
    } catch (err) {
        next(err);
    }
};

exports.getBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.json({ success: true, book });
    } catch (err) {
        next(err);
    }
};

exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.json({ success: true, book });
    } catch (err) {
        next(err);
    }
};

exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.json({ success: true, message: "Book deleted successfully" });
    } catch (err) {
        next(err);
    }
};

exports.borrowBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) return res.status(404).json({ success: false, message: "Book not found" });
        if (book.availableQuantity <= 0) return res.status(400).json({ success: false, message: "Book is currently unavailable" });

        const alreadyBorrowed = await Borrow.findOne({
            memberId: req.user.id,
            bookId: req.params.id,
            status: "borrowed"
        });

        if (alreadyBorrowed) return res.status(400).json({ success: false, message: "You have already borrowed this book" });

        await Borrow.create({ memberId: req.user.id, bookId: req.params.id });
        
        book.availableQuantity -= 1;
        await book.save();

        res.json({ success: true, message: "Book borrowed successfully" });
    } catch (err) {
        next(err);
    }
};

exports.returnBook = async (req, res, next) => {
    try {
        const borrow = await Borrow.findOne({
            memberId: req.user.id,
            bookId: req.params.id,
            status: "borrowed"
        });

        if (!borrow) return res.status(400).json({ success: false, message: "You have not borrowed this book" });

        borrow.status = "returned";
        borrow.returnDate = new Date();
        await borrow.save();

        const book = await Book.findById(req.params.id);
        book.availableQuantity += 1;
        await book.save();

        res.json({ success: true, message: "Book returned successfully" });
    } catch (err) {
        next(err);
    }
};