const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        deadline: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "completed"], // restrict values
            default: "pending",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"], // restrict values
            default: "medium",
        },
    },
    { timestamps: true } // automatically manage createdAt and updatedAt fields
);

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;