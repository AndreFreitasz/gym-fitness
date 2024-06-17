import db from "../database.js";
import bcrypt from "bcrypt";

async function emailExists(email) {
    const sql = "SELECT * FROM users WHERE email = ?";

    const queryPromise = new Promise((resolve, reject) => {
        db.query(
            sql,
            [email],
            (err, result) => err ? reject(err) : resolve(result)
        );
    });

    try {
        const result = await queryPromise;
        return result.length > 0;
    } catch (err) {
        throw err;
    }
}

export const postUsers = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {

        if (await emailExists(req.body.email)) {
            res.status(400).json({ message: "E-mail já está em uso." });
            return;
        }

        const queryPromise = new Promise((resolve, reject) => {
            const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(sql,
                [
                    req.body.name,
                    req.body.email,
                    hashedPassword
                ],
                (err, result) => err ? reject(err) : resolve(result)
            );
        });

        const result = await queryPromise;
        const userId = result.insertId;
        res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            id: userId
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

}