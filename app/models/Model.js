const mongoose = require('mongoose');

class Model {
    constructor(table) {
        this.name = table.name;
        this.schema = new mongoose.Schema(table.schema);
    }

    model() {
        return mongoose.model(this.name, this.schema)
    }
}



module.exports = Model;