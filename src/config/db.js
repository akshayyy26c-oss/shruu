
import "dotenv/config";
import mysql from "mysql2/promise";

const requiredVariables = [
    "DB_HOST",
    "DB_PORT",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME"
];

for (const variable of requiredVariables) {
    if (process.env[variable] === undefined || process.env[variable] === "") {
        throw new Error(`Missing environment variable: ${variable}`);
    }
}

export const pool = mysql.createPool({
    host: process.env.DB_HOST.trim(),
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    connectTimeout: 20000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
});

export async function connectDB() {
    let connection;

    try {
        console.log("Connecting to Railway MySQL...");
        console.log("DB HOST:", process.env.DB_HOST);
        console.log("DB PORT:", process.env.DB_PORT);
        console.log("DB NAME:", process.env.DB_NAME);

        connection = await pool.getConnection();

        const [result] = await connection.query(
            "SELECT DATABASE() AS db, VERSION() AS version"
        );

        console.log("MYSQL CONNECTION SUCCESSFUL");
        console.log("DATABASE:", result[0].db);
        console.log("VERSION:", result[0].version);

        const [tables] = await connection.query("SHOW TABLES");

        console.log(
            "AVAILABLE TABLES:",
            tables.map(row => Object.values(row)[0])
        );

        return true;

    } catch (error) {
        console.error("MYSQL CONNECTION ERROR:", {
            message: error.message,
            code: error.code,
            errno: error.errno,
            sqlState: error.sqlState
        });

        throw error;

    } finally {
        connection?.release();
    }
}
