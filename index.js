const express = require('express');
const autoloader = require('./Autoload');

const port = 3000;
const app = express();

autoloader(app, __dirname + '/app');

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})