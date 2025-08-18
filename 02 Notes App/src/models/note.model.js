const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['work', 'personal', 'study', 'other'],
        default: 'other'
    },
    pinned: {
        type: Boolean,
        default: false,
    },
    archived: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }    // Automatically manage createdAt and updatedAt fields
);

const noteModel = mongoose.model('Notes', noteSchema);

module.exports = noteModel;
