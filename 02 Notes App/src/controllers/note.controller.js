const noteModel = require('../models/note.model');

async function createNote(req, res) {
    try {
        const newNote = await noteModel.create(req.body);
        if (!newNote) {
            return res.status(400).json({ message: 'Failed to create note' });
        }
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

async function fetchNotes(req, res) {
    try {
        const filter = {}
        if (req.query._id) {
            filter._id = req.query._id;
        }
        if (req.query.category) {
            filter.category = req.query.category;
        }
        if (req.query.pinned) {
            filter.pinned = req.query.pinned === 'true';
        }

        const allNotes = await noteModel.find(filter)
        res.status(200).json({ message: "Notes Fetched Successfully...", allNotes });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

async function updateNote(req, res) {
    try {
        const updatedNote = await noteModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote);

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

async function deleteNote(req, res) {
    try {
        const deleteNote = await noteModel.findByIdAndDelete({ _id: req.params.id });
        if (!deleteNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
}

module.exports = {
    createNote,
    fetchNotes,
    updateNote,
    deleteNote
};