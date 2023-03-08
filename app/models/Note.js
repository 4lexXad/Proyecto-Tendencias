const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
    note_name: { type: String, required: true },
    note_content: { type: String, required: true },
    note_img: { type: String, required: true },
});

const Note = mongoose.model('Note-test', notaSchema);

module.exports = Note;