import express from "express";

import { getContext } from "../controllers/context.js";

const router = express.Router();

router.get("/context", (req, res) => {
    res.json({ msg: "Context Server is running!" });
});

router.post("/context", getContext);

export default router;
