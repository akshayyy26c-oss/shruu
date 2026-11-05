
import { pool } from "../config/db.js";

export const getContents = async (req, res, next) => {
    try {
        const [rows] = await pool.execute(
            `SELECT id, question, content, yes, no
             FROM contents
             ORDER BY id ASC`
        );

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        next(error);
    }
};

export const createContent = async (req, res, next) => {
    try {
        const { question, content, yes, no } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO contents
             (question, content, yes, no)
             VALUES (?, ?, ?, ?)`,
            [
                question,
                content || "",
                yes || "",
                no || ""
            ]
        );

        res.status(201).json({
            success: true,
            message: "Question created successfully",
            id: result.insertId
        });

    } catch (error) {
        next(error);
    }
};


