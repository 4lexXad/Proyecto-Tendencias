const BaseController = require('./BaseController');

class WelcomeController extends BaseController {

    async index (req, res) {
        res.render(super.layout(), { 
            title: 'Home',
            content: super.View('home'),
            habitaciones: await super.Model('Habitacion').find()
        })
    }
}

module.exports = new WelcomeController();