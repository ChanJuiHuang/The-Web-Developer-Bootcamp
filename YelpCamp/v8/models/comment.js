const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String
    },
    text: String
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;