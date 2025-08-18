const taskModel = require('../models/task.model')

async function createTask(req, res) {
    try {
        const task = await taskModel.create(req.body)
        res.status(201).json({
            message: "Task Created successfully...",
            task

        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

async function getTask(req, res) {
    try {
        const filter = {}
        // status filter
        if (req.query.status) {
            filter.status = req.query.status;
        }
        // priority filter
        if (req.query.priority) {
            filter.priority = req.query.priority;
        }
        // id filter
        if (req.query._id) {
            filter._id = req.query._id
        }

        const task = await taskModel.find(filter)
        res.status(200).json(task)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

async function getTaskById(req, res) {
    try {
        const task = await taskModel.findById(req.params.id)
        if (!task) {
            return res.status(404).json({
                message: "Task Not Founed..."
            })
        }
        res.status(200).json(task)

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

async function updateTask(req, res) {
    try {
        const task = await taskModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        if (!task) {
            return res.status(404).json({
                message: "Task not Found..."
            })
        }
        res.status(201).json(task)

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
}

async function deleteTask(req, res) {
    try {
        const task = await taskModel.findOneAndDelete(req.params.id)
        if (!task) {
            return res.status(404).json({
                message: "Task not Found..."
            })
        }
        res.status(200).json({
            message: "Task Deleted Successfully..."
        })
    } catch (err) {
        error: err.message
    }
}

module.exports = {
    createTask,
    getTask,
    getTaskById,
    updateTask,
    deleteTask
}