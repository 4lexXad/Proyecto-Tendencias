const express = require('express');
const mongoose = require('mongoose');

const port = 3000;

const app = express()

const user = mongoose.model('users', new mongoose.Schema({
    nombre: String,
    edad: String,
}))

mongoose.connect('mongodb://root:admin@mongoDB:27017/test?authSource=admin')

app.get('/list', async (_req, res) => {
    console.log('listando... usuarios...')
    const users = await user.find();
    return res.send(users)
})

app.get('/save', async (_req, res) => {
    console.log('creando...')
    await user.create({ nombre: 'Alex', edad: '17' })
    return res.send('ok')
})

app.use('/', express.static('public'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})