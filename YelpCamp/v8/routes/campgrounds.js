const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

// INDEX ROUTE
router.get('/', (req, res) => {
    Campground.find({})
        .then((campgrounds) => {
            res.render('campground/index', {campgrounds});
        });
});

// NEW ROUTE
router.get('/new', isLogin, (req, res) => {
    res.render('campground/new');
});

// CREATE ROUTE
router.post('/', isLogin, (req, res) => {
    const newCampground = req.body;
    newCampground.author = {id: req.user._id, username: req.user.username};
    Campground.create(newCampground)
        .then((newCampground) => {
            res.redirect('/campgrounds');
        });
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments')
        .then((campground) => {
            res.render('campground/show', {campground});
        });
});

function isLogin(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');    
}

module.exports = router;