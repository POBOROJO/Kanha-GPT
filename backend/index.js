import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import contextRouter from "./routes/context.js";

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN_URL_1 = process.env.CORS_ORIGIN_URL_1 || "";
const CORS_ORIGIN_URL_2 = process.env.CORS_ORIGIN_URL_2 || "";

app.use(
	cors({
		origin: [CORS_ORIGIN_URL_1, CORS_ORIGIN_URL_2],
		methods: ["GET", "POST"],
	})
);

app.use(express.json());
app.use("/api/v1", contextRouter);
app.listen(PORT, () => {
	console.log(`Server running`);
});
