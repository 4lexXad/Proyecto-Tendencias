const Model = require('./Model');

const table = {
    name: 'Note'
}

const notaSchema = {
    note_name: { type: String, required: true },
    note_content: { type: String, required: true },
    note_img: { type: String, required: true },
};

class Note extends Model {
    constructor() {
        super(table.name, notaSchema);
        this.Model = this.model();
    }
}

const note = new Note ();
module.exports = note;