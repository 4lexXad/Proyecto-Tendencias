const path = require('path');

class BaseController {

    View (view) {
        return path.join(__dirname, '../../', 'public' ,'views', view + '.ejs');
    }

    main () {
        return path.join(__dirname, '../../', 'public' ,'views/layout/main.ejs');
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
        global[key] = value;
    }

    get_value(key) {
        if (!global[key]) return null;
        else return global[key]
    }

    remove_value(key) {
        delete global[key]
    }
}

module.exports = BaseController;