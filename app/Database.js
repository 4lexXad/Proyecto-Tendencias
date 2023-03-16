const Mongo = require('mongoose');

const db = {
    host: 'mongo',
    port: 27017,
    user: 'root',
    password: 'admin',
    database: 'test'
}

Mongo.connect(`mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}?authSource=admin`)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

module.exports = Mongo;