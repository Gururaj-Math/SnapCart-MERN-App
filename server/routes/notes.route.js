import { Router } from "express";
import { getAllNotes, getAllNotesOfUser, getNoteById, deleteNoteById, updateNoteById, createNote } from '../controller/notes.controller.js';

const router = Router();

router.route("/").get(getAllNotes).post(createNote); 
router.route("/user").get(getAllNotesOfUser); 
router.route("/:noteId").get(getNoteById).put(updateNoteById).delete(deleteNoteById); 

export default router;
