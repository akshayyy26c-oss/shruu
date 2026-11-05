
import "dotenv/config";
import mysql from "mysql2/promise";

const requiredVariables = [
    "DB_HOST",
    "DB_USER",
    "DB_NAME"
];

for (const variable of requiredVariables) {
    if (!process.env[variable]) {
        throw new Error(`Missing environment variable: ${variable}`);
    }
}

const sslConfig = process.env.DB_SSL === "true"
    ? {
        rejectUnauthorized:
            process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false"
    }
    : undefined;

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    connectTimeout: 15000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,

    ...(sslConfig ? { ssl: sslConfig } : {})
});

export async function connectDB() {
    let connection;

    try {
        console.log("Connecting to MySQL...");

        connection = await pool.getConnection();

        const [result] = await connection.query(`
            SELECT
                DATABASE() AS database_name,
                VERSION() AS mysql_version,
                NOW() AS server_time
        `);

        console.log("MYSQL CONNECTION SUCCESSFUL");
        console.log("DATABASE:", result[0].database_name);
        console.log("MYSQL VERSION:", result[0].mysql_version);

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
        if (connection) {
            connection.release();
        }
    }
}
