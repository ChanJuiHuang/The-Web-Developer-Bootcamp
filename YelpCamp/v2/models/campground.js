const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const CampgroundSchema = new Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model('campground', CampgroundSchema);

module.exports = Campground;