const Note = require("../Models/Note");
const BaseController = require('./BaseController');

class NoteController extends BaseController {


    async ls (req, res) {
        const notas = await Note.find();
        const content = super.View('notes.ejs')
        
        res.render(super.View('layout/main.ejs'), { content, notas });
    }

    new (req, res) {
        res.render(super.View('new.ejs'));
    }

    async save (req, res) {  
        const data = {
            note_name: req.body.nombre,
            note_content: req.body.content,
            note_img: 'uploads/' + req.file.filename
        }
        
        await new Note(data).save();

        return res.redirect('/note-ls');
    }

    async delete (req, res) {
        const id = req.params.id;
        await Note.findByIdAndDelete(id);
        return res.redirect('/note-ls');
    }
}

module.exports = new NoteController ();