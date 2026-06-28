const User = require("../models/User");
const Borrow = require("../models/Borrow");

exports.getMembers = async (req, res, next) => {
    try {
        const members = await User.find({ role: "member" }).select("-password");
        res.json({ success: true, members });
    } catch (err) {
        next(err);
    }
};

exports.deleteMember = async (req, res, next) => {
    try {
        const member = await User.findByIdAndDelete(req.params.id);
        if (!member) {
            return res.status(404).json({ success: false, message: "Member not found" });
        }
        res.json({ success: true, message: "Member deleted successfully" });
    } catch (err) {
        next(err);
    }
};

exports.myBooks = async (req, res, next) => {
    try {
        const books = await Borrow
            .find({ memberId: req.user.id, status: "borrowed" })
            .populate("bookId");
        res.json({ success: true, books });
    } catch (err) {
        next(err);
    }
};