const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');

// NEW ROUTE
router.get('/new', isLogin, (req, res) => {
    Campground.findById(req.params.id)
        .then((campground) => {
            res.render('comment/new', {campground});
        });
});

// CREATE ROUTE
router.post('/', isLogin, (req, res) => {
    let newComment = new Comment(req.body.comment);
    newComment.author.id = req.user.id;
    newComment.author.username = req.user.username;
    console.log(newComment);
    let updatedCampground = Campground.findByIdAndUpdate(req.params.id,{$push: {comments: newComment}});
    Promise.all([newComment.save(), updatedCampground])
        .then((result) => res.redirect(`/campgrounds/${req.params.id}`));
});

function isLogin(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');    
}

module.exports = router;