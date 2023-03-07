const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3000;

const upload = multer({dest: 'uploads'})

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static('public'));

app.post('/save', upload.single('img'), (req, res) => {
    const nombre = req.body.nombre;
    const content = req.body.content;
    const img = req.file.filename;  
    
    console.log(`Nombre: ${nombre}, Contenido: ${content}, Imagen: ${img}`);
    res.send('Datos recibidos correctamente');
});

app.listen(port, () => {
    console.log(`Example listen on port ${port}`);
});
