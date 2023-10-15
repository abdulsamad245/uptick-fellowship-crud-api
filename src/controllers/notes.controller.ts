import express from 'express';
import Note, { INote } from '../models/Note';

export const createNote = (req: express.Request, res: express.Response) => {
  const { title, content } = req.body;
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const userId = req.user._id;

  const newNote = new Note({ title, content, userId } as INote);

  newNote.save((err:any) => {
    if (err) {
      return res.status(500).json({ message: 'Note creation failed.' });
    }
    return res.status(201).json(newNote);
  });
};

export const getNotes = (req: express.Request, res: express.Response) => {
  const userId = req.user._id;

  Note.find({ userId }, (err, notes) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching notes.' });
    }
    return res.status(200).json(notes);
  });
};

export const getNoteById = (req: express.Request, res: express.Response) => {
  const userId = req.user._id;
  const noteId = req.params.id;

  Note.findOne({ _id: noteId, userId }, (err, note) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching the note.' });
    }
    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }
    return res.status(200).json(note);
  });
};

export const updateNote = (req: express.Request, res: express.Response) => {
  const userId = req.user._id;
  const noteId = req.params.id;
  const { title, content } = req.body;

  Note.findOne({ _id: noteId, userId }, (err, note) => {
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

export const deleteNote = (req: express.Request, res: express.Response) => {
  const userId = req.user._id;
  const noteId = req.params.id;

  Note.findOneAndDelete({ _id: noteId, userId }, (err, note) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting the note.' });
    }
    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }
    return res.status(204).send();
  });
};
