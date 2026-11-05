
// import express from "express";
// import cors from "cors";

// import contentRoutes from "./routes/contentRoutes.js";
// import responseRoutes from "./routes/responseRoutes.js";
// import { errorMiddleware } from "./middleware/errorHandler.js";
// import { pool } from "./config/db.js";

// const app = express();

// // ===============================
// // CORS CONFIGURATION
// // ===============================

// app.use(cors({
//     origin: process.env.FRONTEND_URL || "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// // ===============================
// // BODY PARSER
// // ===============================

// app.use(express.json({ limit: "1mb" }));
// app.use(express.urlencoded({ extended: true }));

// // ===============================
// // REQUEST LOGGER
// // ===============================

// app.use((req, res, next) => {
//     console.log("--------------------------------");
//     console.log("REQUEST:", req.method, req.originalUrl);
//     console.log("BODY:", req.body);
//     console.log("--------------------------------");

//     next();
// });

// // ===============================
// // HEALTH CHECK
// // ===============================

// app.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Angry Bird Friendship API is running!"
//     });
// });

// // ===============================
// // DATABASE HEALTH CHECK
// // ===============================

// app.get("/api/debug-db", async (req, res, next) => {
//     try {
//         const [database] = await pool.query(`
//             SELECT
//                 DATABASE() AS database_name,
//                 VERSION() AS mysql_version,
//                 NOW() AS server_time
//         `);

//         const [tables] = await pool.query("SHOW TABLES");

//         res.status(200).json({
//             success: true,
//             message: "MySQL connected successfully",
//             database: database[0],
//             tables: tables
//         });

//     } catch (error) {
//         console.error("DATABASE CHECK ERROR:", error);
//         next(error);
//     }
// });

// // ===============================
// // TEMPORARY DIRECT INSERT TEST
// // ===============================

// app.post("/api/test-insert", async (req, res, next) => {
//     try {
//         const { question, answer } = req.body;

//         if (!question || !answer) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Question and answer are required"
//             });
//         }

//         const [result] = await pool.execute(
//             `INSERT INTO responses (question, answer)
//              VALUES (?, ?)`,
//             [question, answer]
//         );

//         console.log("MYSQL TEST INSERT SUCCESS:", result.insertId);

//         res.status(201).json({
//             success: true,
//             message: "Data inserted successfully into MySQL",
//             insertId: result.insertId
//         });

//     } catch (error) {
//         console.error("MYSQL TEST INSERT ERROR:", error);
//         next(error);
//     }
// });

// // ===============================
// // CONTENT API
// // ===============================

// app.use("/api/content", contentRoutes);

// // ===============================
// // RESPONSE API
// // ===============================

// app.use("/api/responses", responseRoutes);

// // ===============================
// // 404 HANDLER
// // ===============================

// app.use((req, res) => {
//     res.status(404).json({
//         success: false,
//         message: "API route not found",
//         route: req.originalUrl
//     });
// });

// // ===============================
// // GLOBAL ERROR HANDLER
// // ===============================

// app.use(errorMiddleware);

// export default app;



import express from "express";
import cors from "cors";

import contentRoutes from "./routes/contentRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import { errorMiddleware } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
    console.log("--------------------------------");
    console.log("REQUEST:", req.method, req.originalUrl);
    console.log("BODY:", req.body);
    console.log("--------------------------------");
    next();
});

// Health check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Angry Bird API is running!"
    });
});

// Routes
app.use("/api/content", contentRoutes);
app.use("/api/responses", responseRoutes);

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

// Error handler
app.use(errorMiddleware);

export default app;
