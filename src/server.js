
import "dotenv/config";

import app from "./app.js";
import { connectDB, pool } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log("ANGRY BIRD FRIENDSHIP SERVER");
      console.log(`Server running on port ${PORT}`);
      console.log("Database connected successfully");
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
    console.error("Server startup failed:", error);
    await pool.end().catch(() => {});
    process.exit(1);
  }
}

startServer();
