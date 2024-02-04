const express = require('express');
const Routes = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

Routes.use(express.urlencoded({ extended: true }))



Routes.get('/Home', Controller('Welcome').index);


Routes.use('/public/:path', public);
Routes.use('/', express.static('public'));
module.exports = Routes;

function Controller(name) {
    console.log(`Load \x1b[1m${name}Controller.js\x1b[0m`);
    return require(`./Controller/${name}Controller`);
}

function public(req, res) {
    res.sendFile(path.join(__dirname, '../public/', req.params.path.replace('-', '/')), (err) => {
        if (err) {
            console.error('File', '\x1b[31m', path.join(__dirname, '../') + req.params.path.replace('-', '\\'), '\x1b[0m', ': ERROR', err.statusCode);
            res.status(err.status || 500).send('No file found');
        }
    });
}