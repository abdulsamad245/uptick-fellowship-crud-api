// src/routes/notes.ts
import express from 'express';
import { isLoggedIn } from '../controllers/auth';
import { getNotes, createNote, deleteNote, getNoteById, updateNote } from '../controllers/notes';

const notesRouter = express.Router();

notesRouter.use(isLoggedIn);

notesRouter.get('/', getNotes);
notesRouter.post('/', createNote);
notesRouter.delete('/:id', deleteNote);
// src/routes/notes.ts
notesRouter.get('/:id', getNoteById);
// src/routes/notes.ts
notesRouter.put('/:id', updateNote);



export default notesRouter;
