const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;