import { FaissStore } from "@langchain/community/vectorstores/faiss";

import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

const embeddings = new GoogleGenerativeAIEmbeddings({
	apiKey: "AIzaSyD6SwZ0GQ-zeZ1r9Rvnp8hDcbwMGoxpm7I",
	model: "text-embedding-004", // 768 dimensions
	taskType: TaskType.SEMANTIC_SIMILARITY,
});

const directory = "./vector-store";
const loadedVectorStore = await FaissStore.load(directory, embeddings);

const result = await loadedVectorStore.similaritySearch("What is gita?", 100);
console.log({ similaritySearch: result, length: result.length });
