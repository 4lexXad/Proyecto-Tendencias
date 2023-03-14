const mongoose = require('mongoose');

class Model {
    constructor(name, notaSchema) {
        this.name = name;
        this.notaSchema = new mongoose.Schema(notaSchema);
    }

    model () {
        return mongoose.model(this.name, this.notaSchema)
    }
}

module.exports = Model;