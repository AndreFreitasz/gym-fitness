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

export const searchExercisesSchedule = async (req, res) => {
  const { idUser } = req.query;

  try {
    const queryPromise = new Promise((resolve, reject) => {
      const sql = `
        SELECT
          se.id,
          e.name_exercise,
          dow.name AS day_name,
          se.series,
          se.repetitions
        FROM
          schedule_exercises se
        INNER JOIN
          exercises e ON e.id = se.exercise_id
        INNER JOIN
          days_of_week dow ON dow.id = se.day_id
        WHERE
          se.user_id = ?
      `;
      db.query(sql, idUser, (err, result) =>
        err ? reject(err) : resolve(result),
      );
    });
    const result = await queryPromise;

    const exercisesByDay = result.reduce((acc, exercise) => {
      const { day_name, id, name_exercise, series, repetitions } = exercise;
      if (!acc[day_name]) {
        acc[day_name] = [];
      }
      acc[day_name].push({ id, name_exercise, series, repetitions });
      return acc;
    }, {});

    res.status(200).json({ message: exercisesByDay });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteExerciseSchedule = async (req, res) => {
  const { idExerciseSchedule } = req.body;

  try {
    const deleteScheduleReferencesPromise = new Promise((resolve, reject) => {
      const sql = `
        DELETE
        FROM
          schedule_exercises
        WHERE
          id = ?
      `;
      db.query(sql, [idExerciseSchedule], (err, result) =>
        err ? reject(err) : resolve(result),
      );
    });
    await deleteScheduleReferencesPromise;

    res.status(200).json({ message: "Exercício deletado com sucesso!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
