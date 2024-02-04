const path = require('path');

class BaseController {

    View(view) {
        consoleMessage(`Load View ${view}.ejs`, true)
        return path.join(__dirname, '../../', 'public' ,'views', view + '.ejs');
    }

    layout() {
        consoleMessage(`Load Layout`, true)
        return path.join(__dirname, '../../', 'public' ,'views/layout/main.ejs');
    }

    Model(name) {
        consoleMessage(`Load Model ${name}`, true)
        return require('../Models/' + name)
    }

    menssage (type, body) {
        let msg = {
            msg: true,
            type: type,
            body: body
        }

        return Object.keys(msg)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(msg[key])}`)
        .join('&');
    }

    set_value(key, value) {
        consoleMessage(`Set value ${key} = ${value}`, true)
        global[key] = value;
    }

    get_value(key) {
        consoleMessage(`Get value ${key}`, true)
        if (!global[key]) return null;
        else return global[key]
    }

    remove_value(key) {
        consoleMessage(`Delete value ${key}`, true)
        delete global[key]
    }
}

module.exports = BaseController;
function consoleMessage (message, status = false) {
    if (status) console.log(`Controller - \x1b[1m${message}\x1b[0m`);
    else console.log(`Controller: ${message} status: \x1b[31mERROR\x1b[0m`);
}