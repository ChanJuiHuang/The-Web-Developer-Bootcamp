const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');

const app = express();
const User = require('./models/user');

mongoose.connect('mongodb://localhost/auth_demo');
mongoose.connection
    .once('open', () => console.log('DB is open^^'))
    .on('error', (err) => console.log(err));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'good',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', isLogin, (req, res) => {
    res.render('secret');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secret');
            });
        });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
        successRedirect: '/secret',
        failureRedirect: '/login'
    }));

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

function isLogin(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');    
}

app.listen(3000);