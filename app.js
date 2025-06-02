const express = require('express');
const app = express();
const port = 3081;
const path = require('path');

// Указываем, что статические файлы находятся в папке public
app.use(express.static(path.join(__dirname, 'public')));

// Указываем, где находятся наши шаблоны (views)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Маршрут для главной страницы
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, '127.0.0.1', function() {
    console.log('Server start http://localhost:%s', port);
});