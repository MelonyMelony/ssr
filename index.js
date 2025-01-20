const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`
        <h1>Hei!</h1>
        <p>Dette er paragraf</p>
        <p><a href="/time">Se klokkeslett</a></p>

    `)});

    app.get('/time', (req, res) => {
        res.send('Hello, world! Klokken er ' + new Date().toLocaleTimeString());
    });

    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });