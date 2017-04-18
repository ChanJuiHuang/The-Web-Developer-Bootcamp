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

// INDEX ROUTE
app.get('/campgrounds', (req, res) => {
    Campground.find({})
        .then((campgrounds) => {
            res.render('index', {campgrounds});
        });
});

// NEW ROUTE
app.get('/campgrounds/new', (req, res) => {
    res.render('new');
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
            res.render('show', {campground});
        });
});

app.listen(3000);