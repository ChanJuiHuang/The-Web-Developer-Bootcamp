const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: String,
    text: String
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;