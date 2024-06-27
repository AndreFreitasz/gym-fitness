import db from "../database.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../database.env' });

// Função para gerar o token JWT
function generateToken(user) {
    const { password, ...userInfoWithoutPassword } = user;
    const sercretKey = "abcdefghijklmnopqrstuvwxyz";
    const token = jwt.sign(
        { userId: userInfoWithoutPassword.id, email: userInfoWithoutPassword.email },
        sercretKey,
        { expiresIn: '3h' }
    );
    return token;
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const sql = "SELECT * FROM users WHERE email = ?";
        const results = await new Promise((resolve, reject) => {
            db.query(sql,
                [email],
                (err, result) => err ? reject(err) : resolve(result)
            );
        });

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword || results.length === 0) {
            console.log("Usuário não encontrado");
            res.status(401).json({ message: "Usuário ou senha inválidos" });
            return;
        }

        const token = generateToken(user);
        res.status(200).json({
            message: "Login realizado com sucesso!",
            user: { ...user, password: undefined },
            token
        });
    } catch (error) {
        console.error("Erro ao processar o login:", error);
        res.status(500).json({ 
            message: "Erro ao processar o login.",
            error: error.message
        });
    }
};