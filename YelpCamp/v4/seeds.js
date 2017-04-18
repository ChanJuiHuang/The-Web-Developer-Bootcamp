const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Granite Hill", 
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
];

function seedDB() {
    Campground.remove()
        .then(() => {
            console.log('remove all campgrounds')
            return Comment.remove();
        })
        .then(() => console.log('remove all comments'))
        .then(() => {
            for (let i = 0; i < data.length; i++) {
                let newCampground = new Campground(data[i]);
                let newComment = new Comment({
                    author: 'Homer',
                    text: 'This is a good campground^^'
                });
                newCampground.comments.push(newComment);
                Promise.all([newCampground.save(), newComment.save()])
                    .then(() => console.log('add new data^^'));
            }
        });
}

module.exports = seedDB;