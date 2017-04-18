const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const {isLogin, checkCommentOwnership} = require('../middleware');

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
    let updatedCampground = Campground.findByIdAndUpdate(req.params.id,{$push: {comments: newComment}});
    Promise.all([newComment.save(), updatedCampground])
        .then((result) => res.redirect(`/campgrounds/${req.params.id}`));
});

// EDIT ROUTE
router.get('/:comment_id/edit', isLogin, checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id)
        .then((comment) => {
            res.render('comment/edit', {campground_id: req.params.id, comment});
        });
});

// UPDATE ROUTE
router.put('/:comment_id', isLogin, checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, {$set: req.body.comment})
        .then(() => res.redirect(`/campgrounds/${req.params.id}`));
});

// DELETE ROUTE
router.delete('/:comment_id', (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id)
        .then(() => res.redirect(`/campgrounds/${req.params.id}`));
});

module.exports = router;