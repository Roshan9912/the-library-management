const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["borrowed", "returned"],
        default: "borrowed"
    }
});

module.exports = mongoose.model("Borrow", borrowSchema);