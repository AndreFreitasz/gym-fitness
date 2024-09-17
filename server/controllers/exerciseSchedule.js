import db from "../database.js";

export const postExerciseSchedule = async (req, res) => {
  const { exercises, daysOfWeek, series, repetitions, idUser } = req.body;
  console.log(req.body);

  try {
    new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO 
          schedule_exercises 
          (
            exercise_id, 
            day_id, 
            series, 
            repetitions,
            user_id
          ) 
        VALUES 
          (?, ?, ?, ?, ?)
      `;
      db.query(
        sql,
        [exercises, daysOfWeek, series, repetitions, idUser],
        (err, result) => (err ? reject(err) : resolve(result)),
      );
    });

    res
      .status(200)
      .json({ message: "Exercício foi cadastrado na agenda com sucesso" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const searchDaysOfWeek = async (req, res) => {
  try {
    const queryPromise = new Promise((resolve, reject) => {
      const sql = `
        SELECT
          id,
          name AS name_day
        FROM
          days_of_week
      `;
      db.query(sql, (err, result) => (err ? reject(err) : resolve(result)));
    });
    const result = await queryPromise;

    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
