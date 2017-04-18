const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/blog_demo_2');

const Post = require('./models/post');
const User = require('./models/user');

// let newUser = new User({
//     name: 'Ray',
//     email: 'test@com'
// });

// let newPost = new Post({
//     title: 'P1',
//     content: 'XD'
// });

// newUser.posts.push(newPost);

// Promise.all([newUser.save(), newPost.save()])
//     .then((result) => {
//         console.log(result);
//     });


User.findOne().populate({
        path: 'posts'
    })
    .then((user) => {
        console.log(user);
    });