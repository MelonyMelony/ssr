const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
    user: 'postgres',
    password: 'mysecretpassword',
    host: 'localhost',
    port: 5432,
});

app.use(express.static('public'));


app.get('/deltagere-2', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users'); 
        const users = result.rows;

        let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Deltagere - Server-side</title>
        </head>
        <body>
            <h1>Deltagere (Server-side)</h1>
            <ul>
                ${users.map(user => `<li>${user.name}</li>`).join('')}
            </ul>
        </body>
        </html>
        `;

        res.send(html);
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).send('<h1>Noe gikk galt med databasen.</h1>');
    }
});


app.get('/deltagere-json', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows); 
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Noe gikk galt med databasen.' });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
