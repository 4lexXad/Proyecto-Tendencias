const conn = require('../Database');

class Model {
    constructor(table) {
        this.name = table.name;
        this.connection = conn;
    }

    async find () {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${this.name}`;
            conn.query(query, (err, results, fields) => {
                if (err) {
                    //console.log('Error en la consulta: ', err);
                    console.log('Query:', query, 'status', '\x1b[31m', 'ERROR', '\x1b[0m');
                    resolve([])
                } else {
                    console.log('Query:', query, 'status', '\x1b[1m', '200', '\x1b[0m');
                    console.log(results);
                    resolve(Object.values(results))
                }
            })
        })
    }

    async where(data) {
        const keys = Object.keys(data);

        return new Promise ((resolve, reject) => {
            let query = `SELECT * FROM ${this.name} WHERE ${keys.map(key => `${key} = ${conn.escape(data[key])}`).join(' AND ')}`
            conn.query(query, (err, results, fields) => {
                if (err) {
                    //console.log('Error en la consulta ' + err);
                    console.log('Query:', query, 'status', '\x1b[31m', 'ERROR', '\x1b[0m');
                    resolve([])
                } else {
                    console.log('Query:', query, 'status', '\x1b[1m', '200', '\x1b[0m');
                    if (Object.values(results).length == 0) {
                        resolve([])
                    } else {
                        console.log(results);
                        resolve(Object.values(results))
                    }
                }
            })
        })
    }

    async insert (data) {
        const keys = Object.keys(data)
        const values = Object.values(data).map(value => conn.escape(value));

        return new Promise((resolve, reject) => {
            let query = `INSERT INTO ${this.name} (${keys.join(', ')}) VALUES (${values.join(', ')})`;
            conn.query(query, (err, results, fields) => {
                if (err) {
                    console.log('Query:', query, 'status', '\x1b[31m', 'ERROR', '\x1b[0m');
                    //console.log('Error al insertar');
                    resolve(false)
                } else {
                    console.log('Query:', query, 'status', '\x1b[1m', '200', '\x1b[0m');
                    resolve(true)
                }
            })
        })
    }

    async join(tableName, condition, where) {
        let keys = Object.keys(where);
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${this.name} INNER JOIN ${tableName} ON ${condition[0]} = ${condition[1]} WHERE ${keys.map(key => `${key} = ${conn.escape(where[key])}`).join(' AND ')}`

            conn.query(query, (err, results, fields) => {
                if (err) {
                    console.log('Query:', query, 'status', '\x1b[31m', 'ERROR', '\x1b[0m');
                    //console.log('Error al insertar');
                    resolve([])
                } else {
                    console.log('Query:', query, 'status', '\x1b[1m', '200', '\x1b[0m');
                    if (Object.values(results).length == 0) {
                        resolve([])
                    } else {
                        resolve(Object.values(results))
                    }
                }
            })
        })
    }
}



module.exports = Model;