const express = require('express');
const Routes = express.Router();
const multer = require('multer');
const path = require('path');
const WelcomeController = require('./Controller/WelcomeController');
const SessionController = require('./Controller/SessionController');
const ResourcesController = require('./Controller/ResourcesController');
const WelfareController = require('./Controller/WelfareController');



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

Routes.use(express.urlencoded({ extended: true }))

Routes.get('/Salud', WelcomeController.index);

Routes.get('/register', SessionController.registerForm);
Routes.post('/register-save', SessionController.registerSave);
Routes.get('/login', SessionController.loginForm);
Routes.post('/verify', SessionController.loginVerify);

Routes.get('/resources', ResourcesController.index);

Routes.get('/welfare', WelfareController.index);
Routes.post('/welfare-save', [upload.single('IMAGEN')], WelfareController.save);
Routes.get('/image/:id', WelfareController.image);

Routes.use('/', express.static('public'));
module.exports = Routes;