import express from "express";
import cors from "cors";

import contentRoutes from "./routes/contentRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import { errorMiddleware } from "./middleware/errorHandler.js";

const app = express();

// 1. Log requests BEFORE CORS
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.originalUrl);
  console.log("ORIGIN:", req.headers.origin);
  next();
});

// 2. CORS
const allowedOrigins = [
  "https://shruu-plum.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 3. Body parser
app.use(express.json());

// 4. Test routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Angry Bird API is running!"
  });
});

app.get("/health", (req, res) => {
  res.json({ success: true });
});

// 5. API routes
app.use("/api/content", contentRoutes);
app.use("/api/responses", responseRoutes);

// 6. 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// 7. Error handler
app.use(errorMiddleware);

export default app;
