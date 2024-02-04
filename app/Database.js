const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4138',
    database: 'hotel',
    port: 3306
});

connection.connect((err) => {
    let status = '\x1b[1mConnected\x1b[0m'
    if (err) {
        status = `\x1b[31m${errors[err.errno]}\x1b[0m`
    }
    console.log('Database status', status);
});

module.exports = connection;


errors = {
    "1049" : "Invalid database",
    "-3008" : "Invalid host",
    "1045": "Invalid username or password",
    "-4078": "Invalid port",
    undefined: "Invalid port"
}