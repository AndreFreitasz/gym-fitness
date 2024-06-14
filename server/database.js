import dotenv from 'dotenv';
dotenv.config({ path: './database.env' });

import mysql from 'mysql';

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(function(error) {
    if (error) {
        console.error('Erro ao conectar ao banco de dados: ' + error);
        return;
    };
    
    console.log('Conectado ao banco de dados com sucesso!');
})

export default connection;