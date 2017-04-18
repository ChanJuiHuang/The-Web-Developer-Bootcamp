const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
     var options = {
        root: __dirname + '/views/',
    };
    res.sendFile('index.html', options);
});

app.get('/love/:thing', (req, res) => {
    const thing = req.params.thing;
    res.render('love', {thing});
});

app.get('/posts', (req, res) => {
    const posts = [
        {title: 'XD', author: 'Ray'},
        {title: 'Good~', author: 'Ray'}
    ];
    res.render('posts', {posts, dir: __filename});
});

app.listen(3000);