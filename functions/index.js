import { GoogleGenAI } from "@google/genai";
import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";

setGlobalOptions({ maxInstances: 10 });

// req: request from the client side
// res: response that is sent back

export const bookApi = onRequest(
  { secrets: ["BOOKS_API_KEY"], region: "asia-northeast1" },
  async (req, res) => {
    const param = req.query.q;

    try {
      const apikey = process.env.BOOKS_API_KEY;
      const url = `https://www.googleapis.com/books/v1/volumes?q=${param}&key=${apikey}`;
      const response = await fetch(url);
      if (!response.ok) {
        return res
          .status(response.status)
          .json({ error: "failed to fetch data" });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.log("error fetching data: " + error);
      return res.status(500).json({ error: "server error" });
    }
  },
);

export const geminiApi = onRequest(
  { secrets: ["GEMINI_API_KEY"], region: "asia-northeast1" },
  async (req, res) => {
    const jsonSchema = {
      title: "Book Recommendation",
      type: "array",
      items: {
        type: "object",
        properties: {
          bookTitle: {
            description: "Title of the book",
            type: "string",
          },
          author: {
            description: "Author of the book",
            type: "string",
          },
          genres: {
            description: "Book genre(s)",
            type: "string",
          },
          details: {
            description: "Description of the book in 1 - 2 sentences",
            type: "string",
          },
        },
        required: ["bookTitle", "author", "details", "genres"],
      },
    };

    if (!req.body || !req.body.body) {
      return res.status(400).json({ error: "Prompt Missing " });
    }

    try {
      const key = process.env.GEMINI_API_KEY;
      const ai = new GoogleGenAI({ apiKey: key });

      const q = req.body.body;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: q,
        config: {
          responseMimeType: "application/json",
          responseJsonSchema: jsonSchema,
        },
      });

      try {
        const books = JSON.parse(response.text);
        return res.json(books);
      } catch (error) {
        console.log("Invalid JSON from Gemini:", error);
        return res.status(500).json({ error: "Invalid AI response" });
      }
    } catch (error) {
      console.log("geminiApi: " + error);
      return res.status(500).json({ error: "server error" });
    }
  },
);
