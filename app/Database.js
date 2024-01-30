const Mongo = require('mongoose');

const db = {
    host: 'atlascluster.9hcf2ue.mongodb.net',
    user: encodeURIComponent('root'),
    password: encodeURIComponent('lXz2DijglaY7FIGO')
}

Mongo.connect(`mongodb+srv://${db.user}:${db.password}@${db.host}/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

module.exports = Mongo;