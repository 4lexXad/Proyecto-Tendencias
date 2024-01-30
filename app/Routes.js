const express = require('express');
const Routes = express.Router();
const multer = require('multer');
const path = require('path');
const NoteController = require('./Controller/NoteController');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', 'public', 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

Routes.get('/note-ls', NoteController.ls);
Routes.get('/note-new', NoteController.new);
Routes.post('/note-save', [upload.single('img')], NoteController.save);
Routes.get('/notes-d/:id', NoteController.delete);

Routes.use('/', express.static('public'));
module.exports = Routes;