const Campground = require('../models/campground');
const Comment = require('../models/comment');

const middleware = {};

middleware.isLogin = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');    
}

middleware.checkCampgroundOwnership = (req, res, next) => {
    Campground.findById(req.params.id)
        .then((campground) => {
            if (campground.author.id.equals(req.user._id)){
                return next();
            } else {
                res.redirect('back');
            }
        });
}

middleware.checkCommentOwnership = (req, res, next) => {
    Comment.findById(req.params.comment_id)
        .then((comment) => {
            if (comment.author.id.equals(req.user._id)) {
                return next();
            } else {
                res.redirect('/campgrounds');
            }
        });    
}

module.exports = middleware;