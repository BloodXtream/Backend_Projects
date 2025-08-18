const express = require('express');
const router = express.Router();
const { createNote, fetchNotes, updateNote, deleteNote } = require('../controllers/note.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', authMiddleware, createNote);
router.get('/', authMiddleware, fetchNotes);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;