const BaseController = require("./BaseController");

class ResourcesController extends BaseController {

    async index(req, res) {

        
        res.render(super.main(), {
            title: 'Recursos Educativos',
            content: super.View('resources/list'),
        });
    }
}

module.exports = new ResourcesController();
