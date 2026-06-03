import express from "express"
import { tpFunction } from "../controllers/notesControllers.js";

const router = express.Router();

router.use("/", tpFunction)

export default router;