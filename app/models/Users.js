const Model = require("./Model");

const dataTable = {
    name: 'users'
}

class Users extends Model {
    constructor() {
        super(dataTable)
    }
}

module.exports = new Users();