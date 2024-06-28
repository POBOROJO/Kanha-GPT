// This script loads documents from a directory and splits them into chunks.
// It then generates embeddings for each chunk using the Google Generative AI Embeddings.
// The embeddings are stored in a FaissStore.

// Import necessary modules
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";

// Create a directory loader to load documents from a directory
const directoryLoader = new DirectoryLoader("./source-docs", {
	".pdf": (path) =>
		new PDFLoader(path, {
			splitPages: false, // Do not split PDF pages
		}),
});

// Load documents from the directory
const docs = await directoryLoader.load();

// Create a text splitter to split documents into chunks
const splitter = new RecursiveCharacterTextSplitter({
	chunkSize: 200, // Size of each chunk
	chunkOverlap: 50, // Overlap between chunks
});

// Create Google Generative AI embeddings
const embeddings = new GoogleGenerativeAIEmbeddings({
	apiKey: "AIzaSyD6SwZ0GQ-zeZ1r9Rvnp8hDcbwMGoxpm7I", // API key for Google Generative AI
	model: "text-embedding-004", // Model for generating embeddings
});

// Initialize a FaissStore to store embeddings
let fullVectorStore = null;

// Log the number of documents loaded
console.log({ docs, length: docs.length });

// Loop through each document
for (const doc of docs) {
	// Split the document into chunks
	const splittedDoc = await splitter.splitDocuments([doc]);
	console.log({ length: splittedDoc.length });

	const length = splittedDoc.length; // Get the length of the document

	// Loop through the chunks of the document
	do {
		console.log("Initializing"); // Log the initialization of the FaissStore

		// Get a subset of chunks from the document
		const splicedDoc = splittedDoc.splice(0, 1000);
		console.log({ splicedDocLength: splicedDoc.length });

		// Create a FaissStore from the subset of chunks
		const vectorStore = await FaissStore.fromDocuments(
			splicedDoc,
			embeddings
		);

		// Log the progress of the embedding process
		console.log(
			`Progress: ${(
				((length - splittedDoc.length) / length) *
				100
			).toFixed(2)}%`
		);

		console.log("Merging"); // Log the merging of the FaissStores

		// If the fullVectorStore is null, create a new FaissStore
		if (fullVectorStore === null) {
			fullVectorStore = vectorStore;
			console.log("Full vector store created");
			continue; // Skip the merging step
		}

		// Merge the current FaissStore with the fullVectorStore
		await fullVectorStore.mergeFrom(vectorStore);

		console.log("Merged"); // Log the completion of the merging step
	} while (splittedDoc.length > 0); // Repeat until all chunks are processed
}

// Log the final FaissStore
console.log({ fullVectorStore });

// Save the FaissStore to a directory
await fullVectorStore.save("./vector-store");

console.log("Completed"); // Log the completion of the script
