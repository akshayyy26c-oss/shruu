
import express from "express";
import cors from "cors";

import contentRoutes from "./routes/contentRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import { errorMiddleware } from "./middleware/errorHandler.js";

const app = express();

// ==============================
// CORS CONFIGURATION
// ==============================


const allowedOrigins = [
  ...(process.env.FRONTEND_URLS || "").split(","),
  process.env.FRONTEND_URL,
  "http://localhost:5173"
]
  .filter(Boolean)
  .map(url => url.trim().replace(/\/$/, ""));

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
      return callback(null, true);
    }

    console.error("CORS BLOCKED:", origin);
    return callback(new Error("CORS blocked: " + origin));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


// ==============================
// BODY PARSERS
// ==============================

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// ==============================
// REQUEST LOGGER
// ==============================

app.use((req, res, next) => {
    console.log("--------------------------------");
    console.log("TIME:", new Date().toISOString());
    console.log("REQUEST:", req.method, req.originalUrl);
    console.log("ORIGIN:", req.headers.origin || "No origin");
    console.log("BODY:", req.body || {});
    console.log("--------------------------------");

    next();
});

// ==============================
// ROOT ROUTE
// ==============================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Angry Bird API is running!",
        status: "OK"
    });
});

// ==============================
// HEALTH ROUTE
// ==============================

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        timestamp: new Date().toISOString()
    });
});

// ==============================
// API ROUTES
// ==============================

app.use("/api/content", contentRoutes);
app.use("/api/responses", responseRoutes);

// ==============================
// 404 HANDLER
// ==============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// ==============================
// ERROR HANDLER
// ==============================

app.use(errorMiddleware);

export default app;
