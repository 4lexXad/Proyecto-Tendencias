const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const port = 3000;

const upload = multer({dest: 'uploads'})

const Note = require('./app/models/Note');

mongoose.connect('mongodb://root:admin@mongoDB:27017/test?authSource=admin')
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch(err => {
    console.log('Error al conectar a MongoDB', err);
  });

app.use('/', express.static('public'));

app.post('/save', upload.single('img'), async (req, res) => {
    const nombre = req.body.nombre;
    const content = req.body.content;
    const img = req.file.filename;  
    
    console.log(`Nombre: ${nombre}, Contenido: ${content}, Imagen: ${img}`);
    res.send('Datos recibidos correctamente');

    const note = new Note({
        note_name: nombre,
        note_content: content,
        note_img: img
    });

    await note.save()
      .then(() => {
        console.log('Nota guardada correctamente');
      })
      .catch(err => {
        console.log('Error al guardar la nota', err);
      });
});

app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  return res.send(notes);
})

app.listen(port, () => {
    console.log(`Example listen on port ${port}`);
});