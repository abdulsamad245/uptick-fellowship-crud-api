"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getNotes = exports.createNote = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const createNote = (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id;
    const newNote = new Note_1.default({ title, content, userId });
    newNote.save((err) => {
        if (err) {
            return res.status(500).json({ message: 'Note creation failed.' });
        }
        return res.status(201).json(newNote);
    });
};
exports.createNote = createNote;
const getNotes = (req, res) => {
    const userId = req.user._id;
    Note_1.default.find({ userId }, (err, notes) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching notes.' });
        }
        return res.status(200).json(notes);
    });
};
exports.getNotes = getNotes;
const getNoteById = (req, res) => {
    const userId = req.user._id;
    const noteId = req.params.id;
    Note_1.default.findOne({ _id: noteId, userId }, (err, note) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching the note.' });
        }
        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        return res.status(200).json(note);
    });
};
exports.getNoteById = getNoteById;
const updateNote = (req, res) => {
    const userId = req.user._id;
    const noteId = req.params.id;
    const { title, content } = req.body;
    Note_1.default.findOne({ _id: noteId, userId }, (err, note) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating the note.' });
        }
        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        note.title = title;
        note.content = content;
        note.save((saveErr) => {
            if (saveErr) {
                return res.status(500).json({ message: 'Error updating the note.' });
            }
            return res.status(200).json(note);
        });
    });
};
exports.updateNote = updateNote;
const deleteNote = (req, res) => {
    const userId = req.user._id;
    const noteId = req.params.id;
    Note_1.default.findOneAndDelete({ _id: noteId, userId }, (err, note) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting the note.' });
        }
        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        return res.status(204).send();
    });
};
exports.deleteNote = deleteNote;
//# sourceMappingURL=notes.controller.js.map