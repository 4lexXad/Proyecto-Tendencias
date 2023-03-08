const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname) + '/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const Note = require('./app/Models/Note');

mongoose.connect('mongodb://root:admin@mongo:27017/test?authSource=admin')
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch(err => {
    console.log('Error al conectar a MongoDB', err);
  });

app.set('view engine', 'ejs');
app.use('/', express.static('public'));

app.post('/note-save', [upload.single('img')], async (req, res) => {
    const nombre = req.body.nombre;
    const content = req.body.content;
    const img = req.file.filename;  
    
    console.log(`Nombre: ${nombre}, Contenido: ${content}, Imagen: ${img}`);

    const note = new Note({
        note_name: nombre,
        note_content: content,
        note_img: 'uploads/' + img
    });

    await note.save()
      .then(() => {
        console.log('Nota guardada correctamente');
      })
      .catch(err => {
        console.log('Error al guardar la nota', err);
      });

    return res.redirect('/note-ls');
});

app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  return res.send(notes);
})

app.get('/note-new', async (req, res) => {
  res.render(path.join(__dirname, 'public', 'views', 'new.ejs'));
})

app.get('/note-ls', async (req, res) => {
  const notes = await Note.find();
  res.render(path.join(__dirname, 'public', 'views', 'notes.ejs'), { notas: notes });
})

app.post('/note-search', async (req, res) => {
  const name = req.params.name;
  const notes = await Note.find({ "note_name": name });
  return res.send(notes);
});

app.get('/notes-d/:id', async (req, res) => {
  const id = req.params.id;
  await Note.findByIdAndDelete(id);
  return res.redirect('/note-ls');
});

app.listen(port, () => {
    console.log(`Example listen on port ${port}`);
});

