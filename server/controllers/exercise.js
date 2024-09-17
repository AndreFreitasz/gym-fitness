import db from "../database.js";

export const searchGroupsMuscles = async (req, res) => {
  try {
    const queryPromise = new Promise((resolve, reject) => {
      const sql = "SELECT * FROM body_exercises";
      db.query(sql, (err, result) => (err ? reject(err) : resolve(result)));
    });

    const result = await queryPromise;
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const searchExercises = async (req, res) => {
  const { idUser } = req.query;

  try {
    const queryPromise = new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM exercises WHERE user_id = ? ORDER BY name_exercise";
      db.query(sql, [idUser], (err, result) =>
        err ? reject(err) : resolve(result),
      );
    });

    const result = await queryPromise;
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const postExercises = async (req, res) => {
  const { idUser, nameExercise, muscleGroup } = req.body;

  try {
    const checkIfExerciseExists = await exerciseExists(nameExercise);
    if (checkIfExerciseExists) {
      return res.status(400).json({ message: "Exercício já existe!" });
    }

    const queryPromise = new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO exercises (name_exercise, group_muscle_id, user_id) VALUES (?, ?, ?)";
      db.query(sql, [nameExercise, muscleGroup, idUser], (err, result) =>
        err ? reject(err) : resolve(result),
      );
    });

    await queryPromise;
    res.status(200).json({ message: "Exercício foi cadastrado com sucesso!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteExercises = async (req, res) => {
  const id = req.body.id;

  try {
    const queryPromise = new Promise((resolve, reject) => {
      const sql = "DELETE FROM exercises WHERE id = ?";
      db.query(sql, [id], (err, result) =>
        err ? reject(err) : resolve(result),
      );
    });

    await queryPromise;
    res.status(200).json({ message: "Exercício deletado com sucesso!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const exerciseExists = async (nameExercise) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT COUNT(*) AS count FROM exercises WHERE name_exercise = ?";
    db.query(sql, [nameExercise], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0].count > 0);
      }
    });
  });
};
