const BaseController = require('./BaseController');
const Model = require('../models/Example')

class WelcomeController extends BaseController {

    async index (req, res) {
        res.render(super.main(), { 
            title: 'Home',
            content: super.View('hotel'),
            //data: await Model.find()
        })
    }
}

module.exports = new WelcomeController();