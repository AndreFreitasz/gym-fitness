// server.js
const express = require('express');
const cors = require('cors');
const registerRouter = require('./routes/register');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/register', registerRouter); 

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});