import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

import { FaissStore } from "@langchain/community/vectorstores/faiss";
import dotenv from "dotenv";
dotenv.config();

const getContext = async (req, res) => {
	const { prompt } = req.body;

	try {
		console.log(prompt);
		console.log("GOOGLE_API_KEY", process.env.GOOGLE_API_KEY);

		const embeddings = new GoogleGenerativeAIEmbeddings({
			apiKey: process.env.GOOGLE_API_KEY,
			model: "text-embedding-004", // 768 dimensions
			taskType: TaskType.RETRIEVAL_DOCUMENT,
		});

		const directory = "./vector-store";

		const vectorStore = await FaissStore.load(directory, embeddings);

		const data = await vectorStore.similaritySearch(prompt, 100);

		console.log(data);
		res.status(200).json({ prompt: prompt, data: data });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

export { getContext };
