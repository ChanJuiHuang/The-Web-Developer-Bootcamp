const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const {isLogin} = require('../middleware');


// LANDING ROUTE
router.get('/', (req, res) => {
    res.render('landing');
});

// REGISTER ROUTE
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, account) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                req.flash('success', `Welcome to the Yelp Camp ${account.username}~^^`);
                res.redirect('/campgrounds');
            });
        }
    });
});

// LOGIN ROUTE
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
    successFlash: 'Welcome back~XD',
    failureFlash: 'Username or password is wrong!'
}), (req, res) => {});

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect('/campgrounds');
});

module.exports = router;