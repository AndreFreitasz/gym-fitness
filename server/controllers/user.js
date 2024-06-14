import db from "../database.js";

export const postUsers = (req, res) => {
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(query, [req.body.name, req.body.email, req.body.password], (err, result) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            const userId = result.insertId;
            res.status(201).json({ 
                message: "Usuário cadastrado com sucesso!",
                id: userId
            });
        }
    });
}