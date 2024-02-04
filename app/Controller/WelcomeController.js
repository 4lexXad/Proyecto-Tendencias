const BaseController = require('./BaseController');

class WelcomeController extends BaseController {

    async index (req, res) {
        res.render(super.layout(), { 
            title: 'Home',
            content: super.View('home')
        })
    }
}

module.exports = new WelcomeController();