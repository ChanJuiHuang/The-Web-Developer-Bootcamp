const express = require('express');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('search');
});

app.get('/results', (req, res) => {
    const searchKey = req.query.searchKey;
    let url = `http://www.omdbapi.com/?s=${searchKey}`;
    request(url, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            const data = JSON.parse(body).Search;
            res.render('results', {movies: data})
        }
    });
});


app.listen(3000);