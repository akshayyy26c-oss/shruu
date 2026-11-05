
import express from "express";

import {
    getContents,
    createContent
} from "../controllers/contentController.js";

const router = express.Router();

router.get("/", getContents);
router.post("/", createContent);

export default router;
