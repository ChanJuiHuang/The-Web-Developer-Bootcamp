const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const {isLogin} = require('../middleware');

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
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
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
    failureRedirect: '/login'
}), (req, res) => {});

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

module.exports = router;