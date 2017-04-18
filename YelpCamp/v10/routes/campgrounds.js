const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const {isLogin, checkCampgroundOwnership} = require('../middleware');

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
            req.flash('success', 'Successfully Create new campground^^');
            res.redirect(`/campgrounds`);
        });
});

// SHOW ROUTE
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments')
        .then((campground) => {
            res.render('campground/show', {campground});
        });
});

// EDIT ROUTE
router.get('/:id/edit', isLogin, checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id)
        .then((campground) => {
            res.render('campground/edit', {campground});
        });
});

// UPDATE ROUTE
router.put('/:id', isLogin, checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, {$set: req.body})
        .then(() => {
            res.redirect(`/campgrounds/${req.params.id}`);
        });
});

router.delete('/:id', isLogin, checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/campgrounds'));
});

module.exports = router;