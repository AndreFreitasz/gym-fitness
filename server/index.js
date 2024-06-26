import userRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js";
import exercisesRoutes from "./routes/exercises.js";
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', userRoutes);
app.use('/', loginRoutes);
app.use('/', exercisesRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});