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
        this.note = this.model();
    }

    async allData() {
        return this.note.find();
    }

    async save(data) {
        const noteSave = new this.note(data);
        await noteSave.save();
    }

    async delete(id) {
        await this.note.findByIdAndDelete(id);
    }
}

const note = new Note ();
module.exports = note;