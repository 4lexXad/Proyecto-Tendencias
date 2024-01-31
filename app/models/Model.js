const mysql = require('mysql2');
const conn = require('../Database');

class Model {
    constructor(table) {
        this.name = table.name;
        this.connection = conn;
    }

    async find () {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM ${this.name}`, (err, results, fields) => {
                if (err) {
                    console.log('Error en la consulta: ', err);
                    resolve([])
                } else {
                    resolve(Object.values(results))
                }
            })
        })
    }

    async fidnWhere(data) {
        const keys = Object.keys(data);
        const value = Object.values(data).map(value => conn.escape(value));

        return new Promise ((resolve, reject) => {
            conn.query(`SELECT * FROM ${this.name} WHERE ${keys.map(key => `${key} = ${conn.escape(data[key])}`).join(' AND ')}`, (err, results, fields) => {
                if (err) {
                    console.log('Error en la consulta ' + err);
                    resolve([])
                } else {
                    if (Object.values(results).length == 0) {
                        resolve(false)
                    } else {
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
            conn.query(`INSERT INTO ${this.name} (${keys.join(', ')}) VALUES (${values.join(', ')})`, (err, results, fields) => {
                if (err) {
                    console.log('Error al insertar');
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    }
}



module.exports = Model;