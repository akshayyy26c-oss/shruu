
import { pool } from "../config/db.js";

export const getResponses = async (req, res, next) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM responses ORDER BY id DESC"
        );

        res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        next(error);
    }
};

export const createResponse = async (req, res, next) => {
    try {
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({
                success: false,
                message: "Question and answer are required"
            });
        }

        const [result] = await pool.execute(
            "INSERT INTO responses (question, answer) VALUES (?, ?)",
            [question, answer]
        );

        res.status(201).json({
            success: true,
            message: "Response saved successfully",
            id: result.insertId
        });
    } catch (error) {
        next(error);
    }
};



