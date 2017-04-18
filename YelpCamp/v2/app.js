const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Campground = require('./models/campground');
const app = express();

mongoose.connect('mongodb://localhost/yelp_camp');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

const campgrounds = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg", description: 'good'},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg", description: 'XD'},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg", description: 'WOW'}
];

// Campground.remove({})
//     .then(() => Campground.create(campgrounds))
//     .then((campgrounds) => {
//         console.log(`The length of testing data is "${campgrounds.length}"`);
//     });

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    Campground.find({})
        .then((campgrounds) => {
            res.render('index', {campgrounds});
        });
});

app.post('/campgrounds', (req, res) => {
    const newCampground = req.body;
    Campground.create(newCampground)
        .then((newCampground) => {
            res.redirect('/campgrounds');
        });
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id)
        .then((campground) => {
            res.render('show', {campground});
        });
});

app.listen(3000);