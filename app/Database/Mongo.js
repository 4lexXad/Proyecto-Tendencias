const Mongo = require('mongoose');

const db = {
    host: '',
    port: 3306,
    user: '',
    password: '',
    database: ''
}

Mongo.connect(`mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}?authSource=admin`)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

module.exports = Mongo;