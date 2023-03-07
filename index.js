const express  = require('express');
const mongoose = require('mongoose');

const user = mongoose.model('users', new mongoose.Schema({
  nombre: String,
  edad: String,
}))

const app = express()

mongoose.connect('mongodb://root:admin@mongoDB:27017/test?authSource=admin')

app.get('/', async (_req, res) => {
  console.log('listando... usuarios...')
  const users = await user.find();
  return res.send(users)
})
app.get('/crear', async (_req, res) => {
  console.log('creando...')
  await user.create({ nombre: 'Alex', edad: '17' })
  return res.send('ok')
})

app.listen(3000, () => console.log('listening...'))