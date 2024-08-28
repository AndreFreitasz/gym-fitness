import db from "../database.js";

export const postWeightRecord = async (req, res) => {
    const { exercises, recordsWeights, dateOfRecordWeight, idUser } = req.body;

    try {

        const queryPromise = new Promise((resolve, reject) => {
            const sql = "INSERT INTO weights_records (weight_record, date, user_id, exercise_id) VALUES (?, ?, ?, ?)";
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