const Note = require("../Models/Note");
const Ctr = require("./Controller");

class NoteController {
    constructor () {
    }

    async ls (req, res) {
        const notes = await Note.allData();
        res.render(Ctr.View('notes.ejs'), { notas: notes });
    }

    new (req, res) {
        res.render(Ctr.View('new.ejs'));
    }

    async save (req, res) {  
        const data = {
            note_name: req.body.nombre,
            note_content: req.body.content,
            note_img: 'uploads/' + req.file.filename
        }
        
        await Note.save(data);

        return res.redirect('/note-ls');
    }

    async delete (req, res) {
        const id = req.params.id;
        await Note.delete(id);
        return res.redirect('/note-ls');
    }
}

const note = new NoteController ();
module.exports = note;