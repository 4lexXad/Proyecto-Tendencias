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

const Note = require('./app/models/Note');

mongoose.connect('mongodb://root:admin@localhost:27017/test?authSource=admin')
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch(err => {
    console.log('Error al conectar a MongoDB', err);
  });

app.set('view engine', 'ejs');
app.use('/', express.static('public'));

app.post('/save', upload.single('img'), async (req, res) => {
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

    return res.redirect('/notes-list');
});

app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  return res.send(notes);
})

app.get('/notes-list', async (req, res) => {
  const notes = await Note.find();
  res.render(path.join(__dirname, 'public', 'views', 'notes.ejs'), { notas: notes });
})

app.get('/notes/:id', async (req, res) => {
  const id = req.params.id;
  const note = await Note.findById(id);
  return res.send(note);
});

app.get('/notes-d/:id', async (req, res) => {
  const id = req.params.id;
  await Note.findByIdAndDelete(id);
  return res.redirect('/notes-list');
});

app.listen(port, () => {
    console.log(`Example listen on port ${port}`);
});

