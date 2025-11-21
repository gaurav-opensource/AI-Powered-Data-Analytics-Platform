import type { Request, Response } from "express";
import fetch from "node-fetch";


// Generate response using the prompt query
export const chatWithData = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Call Python FastAPI service
    const pythonResponse = await fetch("http://127.0.0.1:8000/chat-with-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    // Convert Python response to JSON
    const result = await pythonResponse.json();

    return res.json(result);

  } catch (error) {
    return res.status(500).json({ error: "Backend failed to reach Python API" });
  }
};
