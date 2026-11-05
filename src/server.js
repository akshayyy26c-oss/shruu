
import "dotenv/config";

import app from "./app.js";
import { connectDB, pool } from "./config/db.js";

const PORT = process.env.PORT || 5000;



async function startServer() {
    try {
        console.log("DB HOST:", process.env.DB_HOST);
        console.log("DB USER:", process.env.DB_USER);
        console.log("DB PASSWORD LOADED:", Boolean(process.env.DB_PASSWORD));

        await connectDB();

        const server = app.listen(PORT, () => {
            console.log("----------------------------------");
            console.log("ANGRY BIRD FRIENDSHIP SERVER");
            console.log("----------------------------------");
            console.log(`Server: http://localhost:${PORT}`);
            console.log("----------------------------------");
        });

        const shutdown = () => {
            server.close(async () => {
                await pool.end();
                process.exit(0);
            });
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);

    } catch (error) {
        console.error("Server startup failed:", error.message);
        await pool.end().catch(() => {});
        process.exit(1);
    }
}

startServer();
