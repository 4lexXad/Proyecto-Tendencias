const mongoose = require('mongoose');

class Model {
    constructor(name, notaSchema) {
        this.name = name;
        this.notaSchema = new mongoose.Schema(notaSchema);
    }

    model() {
        return mongoose.model(this.name, this.notaSchema)
    }

    async allData() {
        return this.Model.find();
    }

    async save(data) {
        await new this.Model(data).save();
    }

    async delete(id) {
        await this.Model.findByIdAndDelete(id);
    }
}



module.exports = Model;