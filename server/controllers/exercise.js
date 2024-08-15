import db from "../database.js";

export const postExercises = async (req, res) => {
    const nameExercise = req.body.nameExercise;

    try {
        const queryPromise = new Promise((resolve, reject) => {
            const sql = "INSERT INTO execises (name_exercise) VALUES (?)";
            db.query(sql,
                [
                    nameExercise
                ],
                (err, result) => err ? reject(err) : resolve(result)
            );
        });

        const result = await queryPromise;
        res.status(200).json({ message: "Exercício adicionado com sucesso" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}