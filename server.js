import express from "express";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenvConfig();

const PORT = process.env.REACT_API_PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

// Calling config function from dotenv

const genAI = new GoogleGenerativeAI(
	process.env.REACT_API_GEN_API_KEY || "YOUR_API_KEY"
);

app.post("/krishna", async (req, res) => {
	const model = genAI.getGenerativeModel({ model: "gemini-pro" });

	const chat = model.startChat({
		history: req.body.history,
		message: req.body.message,
	});

	const prompt = req.body.prompt;

	console.log(prompt);
	const result = await chat.sendMessage(prompt);
	const response = await result.response;
	console.log(response);
	const text = response.text();
	console.log(text);
	res.send(text);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
