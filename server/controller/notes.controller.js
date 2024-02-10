import { Note } from "../models/notes.model.js";

const getAllNotes = async (req, res) => {
    try {
      const notes = await Note.find();
      res.json({ success: true, notes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };

  
  const createNote = async (req, res) => {
    try {
      const { description, userId } = req.body; 
  
      const note = new Note({
        description,
        userOwner: userId
      });
  
      await note.save();
      res.status(201).json({ success: true, note });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  

// Get all notes for a user
const getAllNotesOfUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const notes = await Note.find({ userOwner: userId });
    res.json({ success: true, notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get a single note by ID
const getNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findOne({ _id: noteId });
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.json({ success: true, note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update a note by ID
const updateNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { description } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: noteId },
      { description },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.json({ success: true, note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete a note by ID
const deleteNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Note.findOneAndDelete({ _id: noteId });
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export {
    getAllNotes,
    createNote,
    getAllNotesOfUser,
    getNoteById,
    updateNoteById,
    deleteNoteById
  };
  