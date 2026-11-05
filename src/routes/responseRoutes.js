
import express from "express";

import {
    getResponses,
    createResponse
} from "../controllers/responseController.js";

const router = express.Router();

router.get("/", getResponses);
router.post("/", createResponse);

export default router;

