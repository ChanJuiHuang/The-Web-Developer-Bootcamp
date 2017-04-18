const express = require('express');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();
const Blog = require('./models/blog');

mongoose.connect('mongodb://localhost/blog_app');
mongoose.connection
    .once('open', () => console.log('DB is opened^^'))
    .on('error', (err) => console.log(err));

// Blog.create({
//     title: 'Good View',
//     image: 'https://source.unsplash.com/Dq3LFhdmYcw',
//     body: 'WOW'
// });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// INDEX ROUTE
app.get('/blogs', (req, res) => {
    Blog.find({})
        .then((blogs) => {
            res.render('index', {blogs}); 
        });
});

// NEW ROUTE
app.get('/blogs/new', (req, res) => {
    res.render('new');
});

// CREATE ROUTE
app.post('/blogs', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog)
        .then((blog) => {
            res.redirect('/blogs');
        });
});

// SHOW ROUTE
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then((blog) => {
            res.render('show', {blog});
        });
});

// EDIT ROUTE
app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id)
        .then((blog) => {
            res.render('edit', {blog});
        });
});

// UPDATE ROUTE
app.put('/blogs/:id', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, {$set: req.body.blog})
        .then((blog) => {
             res.redirect(`/blogs/${req.params.id}`);
        });
});

// DELETE ROUTE
app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/blogs'));
});

app.listen(3000);