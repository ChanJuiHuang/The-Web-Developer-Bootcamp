const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/blog_demo');

mongoose.Promise = global.Promise;

const PostSchema = new Schema({
    title: String,
    content: String
});

const Post = mongoose.model('post', PostSchema);

const UserSchema = new Schema({
    name: String,
    email: String,
    posts: [PostSchema]
});

const User = mongoose.model('user', UserSchema);


let newUser = new User({
    name: 'Ray',
    email: 'test@com'
});

newUser.posts.push({
    title: 'WoW',
    content: 'Ha Ha'
});

newUser.save()
    .then((user) => {
        console.log(user);
    });

// let newPost = new Post({
//     title: 'P1',
//     content: 'XD'
// });

// Promise.all([newUser.save(), newPost.save()])
//     .then((result) => {
//         console.log(result);
//     });