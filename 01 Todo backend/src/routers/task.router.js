const express = require('express');
const { createTask, getTask, getTaskById, updateTask, deleteTask } = require('../controllers/task.controller');
const router = express.Router();

router.post('/', createTask);
router.get('/', getTask)
router.get('/:id', getTaskById)
router.put('/:id', updateTask)
router.delete("/:id", deleteTask)

module.exports = router