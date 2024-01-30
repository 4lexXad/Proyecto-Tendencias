const Model = require('./Model');

const dataTable = {
    name: 'Nota',
    schema: {
        note_name: { type: String, required: true },
        note_content: { type: String, required: true},
        note_img: { type: String, required: true}
    }
}

class Note extends Model {
    constructor() {
        super(dataTable);
        this.Model = this.model();
    }
}

module.exports = new Note().model();