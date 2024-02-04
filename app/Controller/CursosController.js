const BaseController = require("./BaseController");

class CursosController extends BaseController{
    async index(req, res){
        res.render(super.layout(), {
            title: 'Cursos',
            content: super.View('cursos'),
            cursos: await super.Model('cursos').find()
        })
    }

    async getImage(req, res){
        const image = await super.Model('Cursos').getImage(req.params.id) 
        if (image) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' })
            res.end(image, 'binary');
            console.log(`Query: imagen/${req.params.id}`, 'status', '\x1b[1m', '200', '\x1b[0m');
        } else {
            res.status(404).send('Error');
            console.log(`Query: imagen/${req.params.id}`, 'status', '\x1b[31m', '404', '\x1b[0m');

        }
    }
}

module.exports = new CursosController();