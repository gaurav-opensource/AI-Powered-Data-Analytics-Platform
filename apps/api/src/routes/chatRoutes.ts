import express from "express";
import { chatWithData } from "../controllers/chatController.ts";

const router = express.Router();

router.post("/chat-with-data", chatWithData);

export default router;
