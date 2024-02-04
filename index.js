const express = require('express');
const autoloader = require('./Autoload');

const port = 3000;
const app = express();

autoloader(app, __dirname + '/app');

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log('Proyect listening link', '\x1b[1m', `http://localhost:${port}/Home`, '\x1b[0m')
})