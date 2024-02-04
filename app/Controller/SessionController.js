const BaseController = require("./BaseController");

class SessionController extends BaseController{
    index(req, res){
        res.render(super.layout(), {
            content: super.View('login'),
            title: 'Login'
        })
    }
}

module.exports = new SessionController();
