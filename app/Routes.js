const express = require('express');
const Routes = express.Router();
const Model = require('./Models/BaseModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname) + '/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
const upload = multer({ storage: storage });

let route = [];

const Note = Model('Note');

route.push({
    path: '/note-save',
    method: 'POST',
    media: [
        upload.single('img')
    ],
    function: async (req, res) => {
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
    }
})

route.push({
    path: '/note-ls',
    method: 'GET',
    function: async (req, res) => {
        const notes = await Note.find();
        return res.send(notes);
    }
})

route.push({
    path: '/note/:id',
    method: 'GET',
    function: async (req, res) => {
        const id = req.params.id;
        const note = await Note.findById(id);
        return res.send(note);
    }

})

route.push({
    path: '/note-del/:id',
    method: 'DELETE',
    function: async (req, res) => {
        const id = req.params.id;
        await Note.findByIdAndDelete(id);
        return res.redirect('/note-ls');
    }
})


route.forEach(r => {
    switch (r.method) {
        case 'GET':
            Routes.get(r.path, r.function);
            break;
        case 'POST':
            Routes.post(r.path, r.media, r.function);
            break;
        case 'PUT':
            Routes.put(r.path, r.function);
            break;
        case 'DELETE':
            Routes.delete(r.path, r.function);
            break;
        default:
            break;
    }
});

Routes.use('/', express.static('public'));
module.exports = Routes;