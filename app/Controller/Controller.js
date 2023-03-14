const path = require('path');

const Controller = {
    View: function (view) {
        return path.join(__dirname, '../../', 'public' ,'views', view);
    }
}

module.exports = Controller;