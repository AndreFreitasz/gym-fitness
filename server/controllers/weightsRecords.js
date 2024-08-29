import db from "../database.js";

export const postWeightRecord = async (req, res) => {
    const { exercises, recordsWeights, dateOfRecordWeight, idUser } = req.body;

    try {

        const queryPromise = new Promise((resolve, reject) => {
            const sql = "INSERT INTO weights_records (record_weight, record_weight_date, user_id, exercise_id) VALUES (?, ?, ?, ?)";
            db.query(sql,
                [
                    recordsWeights,
                    dateOfRecordWeight,
                    idUser,
                    exercises
                ],
                (err, result) => err ? reject(err) : resolve(result)
            );
        });

        await queryPromise;
        res.status(200).json({ message: "Exercício foi cadastrado com sucesso!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const searchUserData = async (req, res) => {
    const { idUser } = req.query;

    try {
        const queryPromise = new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    e.name_exercise,
                    be.group_muscle AS muscle_group_name,
                    wr.record_weight
                FROM 
                    weights_records wr 
                JOIN 
                    exercises as e ON wr.exercise_id = e.id
                JOIN 
                    body_exercises as be ON e.group_muscle_id = be.id
                WHERE 
                    wr.user_id = ?
            `;
            db.query(sql, idUser, (err, result) => err ? reject(err) : resolve(result)
            );
        });

        const result = await queryPromise;
        res.status(200).json({ message: result });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}