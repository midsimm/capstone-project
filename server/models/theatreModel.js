const mongoose = require('mongoose');

// TheatreSchema

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    // },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("theatres", theatreSchema);