const Model = require('./Model')

class Cursos extends Model {
    constructor() {
        super({name: 'cursos'})
    }

    async getImage(id){
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT imagen FROM ${this.name} WHERE id = ${id}`, (err, results, fields) => {
                if (err) {
                    console.log('Error al insertar');
                    resolve([])
                } else {
                    resolve(Object.values(results)[0].imagen)
                }
            })
        })
    }
}

module.exports = new Cursos();