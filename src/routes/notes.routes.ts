import express from 'express';
import * as notesController from '../controllers/notes.controller';
import passport from 'passport';

const router = express.Router();

// Create a new note
router.post(
  '/notes',
  passport.authenticate('jwt', { session: false }),
  notesController.createNote
);

// Retrieve all notes
router.get(
  '/notes',
  passport.authenticate('jwt', { session: false }),
  notesController.getNotes
);

// Retrieve a single note by ID
router.get(
  '/notes/:id',
  passport.authenticate('jwt', { session: false }),
  notesController.getNoteById
);

// Update a note by ID
router.put(
  '/notes/:id',
  passport.authenticate('jwt', { session: false }),
  notesController.updateNote
);

// Delete a note by ID
router.delete(
  '/notes/:id',
  passport.authenticate('jwt', { session: false }),
  notesController.deleteNote
);

export default router;
