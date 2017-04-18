const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hi there, welcome to my assignment!');
});

app.get('/speak/:animal', (req, res) => {
    const animals = {
        pig: 'Oink',
        cow: 'Moo',
        dog: 'Woof Woof!'
    };
    let animal = req.params.animal;
    let sound = animals[animal];
    res.send(`The ${animal} says '${sound}'`);
});

app.get('/repeat/:str/:times', (req, res) => {
    const str = req.params.str;    
    const times = parseInt(req.params.times);
    let repeatRes = '';
    for (let i = 0; i < times; i++) {
        repeatRes = `${repeatRes} ${str}`;
    }
    res.send(repeatRes);
});

app.get('*', (req, res) => {
   res.send('Sorry, page not found...What are you doing with your life?');
});

app.listen(3000);

module.exports = app; // export to testing