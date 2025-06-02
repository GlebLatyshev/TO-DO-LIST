const express = require('express');
const app = express();
const port = 3081;
const hbs = require('hbs');
const path = require('path');

app.use(express.static('public'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', function(req, res) {
    res.render('index.hbs');
});

app.listen(port, '127.0.0.1', function() {
    console.log('Server start http://localhost:%s', port);
});