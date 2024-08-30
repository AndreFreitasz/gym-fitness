import db from "../database.js";
import { format } from 'date-fns';

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
                    wr.record_weight,
                    wr.record_weight_date
                FROM 
                    weights_records wr 
                JOIN 
                    exercises as e ON wr.exercise_id = e.id
                JOIN 
                    body_exercises as be ON e.group_muscle_id = be.id
                WHERE 
                    wr.user_id = ?
                    ORDER BY wr.record_weight_date DESC
            `;
            db.query(sql, idUser, (err, result) => err ? reject(err) : resolve(result)
            );
        });

        const result = await queryPromise;

        const formattedResult = result.map(record => ({
            ...record,
            record_weight: `${record.record_weight} kg`,
            record_weight_date: format(new Date(record.record_weight_date), 'dd/MM/yyyy')
        }));
        
        res.status(200).json({ message: formattedResult });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}