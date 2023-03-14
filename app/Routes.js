const express = require('express');
const Routes = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../', 'public', 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
const upload = multer({ storage: storage });

const Note = require('./Controller/NoteController');

Routes.get('/note-ls', Note.ls);
Routes.get('/note-new', Note.new);
Routes.post('/note-save', [upload.single('img')], Note.save);
Routes.get('/notes-d/:id', Note.delete);

Routes.use('/', express.static('public'));
module.exports = Routes;