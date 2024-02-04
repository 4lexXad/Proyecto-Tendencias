const BaseController = require("./BaseController");

class ResourcesController extends BaseController {

    async index(req, res) {

        
        res.render(super.layout(), {
            title: 'Contactanos',
            content: super.View('contacto'),
        });
    }
}

module.exports = new ResourcesController();
