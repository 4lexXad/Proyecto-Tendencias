const BaseController = require("./BaseController");
const Model = require('../models/Users');

class SessionController extends BaseController {
    registerForm(req, res) {
        res.render(super.main(), {
            title: 'Registro',
            content: super.View('user/register')
        })
    }
    async registerSave(req, res) {
        if (req.body.CLAVE_1 != req.body.CLAVE_2) return;

        const data = {
            'nombres': req.body.NOMBRE,
            'apellidos': req.body.APELLIDO,
            'email': req.body.EMAIL,
            'clave': req.body.CLAVE_1,
        }

        if (!await Model.fidnWhere({ email: data.email })) {
            let query = await Model.insert(data)
            let msg = {
                type: query ? 'success' : 'danger',
                body: query ? 'Registro completo' : 'Error al insertar intente de nuevo'
            }

            return res.redirect('/login?' + super.menssage(msg.type, msg.body))
        } else {
            return res.redirect('/register')
        }

    }

    loginForm(req, res) {
        res.render(super.main(), {
            title: 'Login',
            content: super.View('user/login')
        })
    }

    async loginVerify(req, res) {

        let data = {
            email: req.body.EMAIL,
            clave: req.body.CLAVE
        }

        let user = await Model.fidnWhere(data);

        if (user) {
            super.set_value('nombres', user[0].nombres)
            super.set_value('apellidos', user[0].apellidos)
            super.set_value('email', user[0].email)
            super.set_value('clave', user[0].clave)
            super.set_value('id', user[0].id)
             
            return res.redirect('/Salud')
        } else {
            return res.redirect('/login');
        }
    }
}

module.exports = new SessionController();