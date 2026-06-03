import express from "express";
import { FetchALL, createNote, updateNote, deleteNote, FetchByID } from "../controllers/notesControllers.js";
const router = express.Router();

// implementing the functions in routes
// this are the endpoints
router.get("/", FetchALL)

router.get("/:id", FetchByID)
// using controller 

router.post("/", createNote)

router.put("/:id", updateNote)

router.delete("/:id", deleteNote)

export default router;