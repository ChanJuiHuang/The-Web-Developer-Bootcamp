const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');
const User = require('./models/user');
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

// Auth Config
app.use(session({
    secret: 'good',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

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
app.get('/campgrounds/:id/comments/new', isLogin, (req, res) => {
    Campground.findById(req.params.id)
        .then((campground) => {
            res.render('comment/new', {campground});
        });
});

// CREATE ROUTE
app.post('/campgrounds/:id/comments', isLogin, (req, res) => {
    let newComment = new Comment(req.body.comment);
    let updatedCampground = Campground.findByIdAndUpdate(req.params.id,{$push: {comments: newComment}});
    Promise.all([newComment.save(), updatedCampground])
        .then((result) => res.redirect(`/campgrounds/${req.params.id}`));
});

// =============================================

// =================== Auth=====================
// REGISTER ROUTE
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
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
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {});

// LOGOUT ROUTE
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

function isLogin(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');    
}
// =============================================

app.listen(3000);