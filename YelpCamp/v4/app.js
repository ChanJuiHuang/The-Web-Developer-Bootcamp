const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const seedDB = require('./seeds');
const app = express();

mongoose.connect('mongodb://localhost/yelp_camp');
mongoose.connection
    .once('open', () => console.log('DB is open^^'))
    .on('error', (err) => console.log(err));

// Add seed data
seedDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

// ROUTE
app.get('/', (req, res) => {
    res.render('landing');
});

// ============ Campground Route ===============
// INDEX ROUTE
app.get('/campgrounds', (req, res) => {
    Campground.find({})
        .then((campgrounds) => {
            res.render('campground/index', {campgrounds});
        });
});

// NEW ROUTE
app.get('/campgrounds/new', (req, res) => {
    res.render('campground/new');
});

// CREATE ROUTE
app.post('/campgrounds', (req, res) => {
    const newCampground = req.body;
    Campground.create(newCampground)
        .then((newCampground) => {
            res.redirect('/campgrounds');
        });
});

// SHOW ROUTE
app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments')
        .then((campground) => {
            res.render('campground/show', {campground});
        });
});
// =============================================

// ============== Comment Route ================
// NEW ROUTE
app.get('/campgrounds/:id/comments/new', (req, res) => {
    Campground.findById(req.params.id)
        .then((campground) => {
            res.render('comment/new', {campground});
        });
});

// CREATE ROUTE
app.post('/campgrounds/:id/comments', (req, res) => {
    let newComment = new Comment(req.body.comment);
    let updatedCampground = Campground.findByIdAndUpdate(req.params.id,{$push: {comments: newComment}});
    Promise.all([newComment.save(), updatedCampground])
        .then((result) => res.redirect(`/campgrounds/${req.params.id}`));
});

// =============================================

app.listen(3000);