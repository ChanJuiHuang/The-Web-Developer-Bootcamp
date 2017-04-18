const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    name: String,
    email: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;