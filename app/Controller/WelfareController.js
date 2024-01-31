const BaseController = require("./BaseController");
const Model = require('../models/Activities');

class WelfareController extends BaseController {

    async index (req, res) {

        res.render(super.main(), {
            title: 'Bienestar',
            content: super.View('user/welfare'),
            user: {
                nombres: super.get_value('nombres'),
                apellidos: super.get_value('apellidos'),
                email: super.get_value('email'),
                clave: super.get_value('clave'),
                actividades: await Model.fidnWhere({user_id: super.get_value('id')})
            },
        })
    }

    async save (req, res) {
        let data = {
            titulo: req.body.TITULO,
            descripcion: req.body.DESCRIPCION,
            fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
            calificacion: req.body.CALIFICACION,
            actividad: req.body.ACTIVIDAD,
            user_id: super.get_value('id'),
            imagen: req.file.buffer
        }

        if (Model.insert(data)) {
            res.redirect('/welfare') 
        } else {
            console.log('Error al ingresar');
        }

    }

    async image(req, res) {
        const imagen = await Model.selectImage(req.params.id)
        if (imagen) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' })
            res.end(imagen, 'binary');
        } else {
            res.status(404).send('Error');
        }
    }
}

module.exports = new WelfareController ();