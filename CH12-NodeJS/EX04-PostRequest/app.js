const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const friends = ['Ray', 'Bob', 'Tina'];

app.set('view engine', 'ejs');
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/friends', (req, res) => {
    res.render('friends', {friends});
});

app.post('/addfriend', (req, res) => {
    const friend = req.body.newFriend;
    friends.push(friend);
    console.log('Success POST!');
    res.redirect('/friends');
});

app.listen(3000);