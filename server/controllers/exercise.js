import db from "../database.js";

export const searchGroupsMuscles = async (req, res) => {
    try {
        const queryPromise = new Promise((resolve, reject) => {
            const sql = "SELECT * FROM body_exercises";
            db.query(sql, (err, result) => err ? reject(err) : resolve(result));
        });

        const result = await queryPromise;
        res.status(200).json({message: result});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const postExercises = async (req, res) => {
    const nameExercise = req.body.nameExercise;
    const muscleGroup = req.body.muscleGroup;

    try {
        const queryPromise = new Promise((resolve, reject) => {
            const sql = "INSERT INTO exercises (name_exercise, group_muscle_id) VALUES (?, ?)";
            db.query(sql,
                [
                    nameExercise,
                    muscleGroup
                ],
                (err, result) => err ? reject(err) : resolve(result)
            );
        });

        const result = await queryPromise;
        res.status(200).json({ message: "Exercício foi cadastrado com sucesso!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}