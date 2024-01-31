const Model = require("./Model");

const dataTable = {
    name: 'activities'
}

class Activities extends Model {
    constructor () {
        super(dataTable)
    }

    async selectImage (id) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT imagen FROM ${this.name} WHERE id = ${id}`, (err, results, fields) => {
                if (err) {
                    console.log('Error al obtener imagen + ' + err);
                    resolve(false)
                } else {
                    resolve(results[0].imagen)
                }
            })
        })
    }
}

module.exports = new Activities();