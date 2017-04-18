const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const CampgroundSchema = new Schema({
    name: String,
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String
    },
    image: String,
    description: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

const Campground = mongoose.model('campground', CampgroundSchema);

module.exports = Campground;