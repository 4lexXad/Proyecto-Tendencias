const path = require('path');

class BaseController {
    View (view) {
        return path.join(__dirname, '../../', 'public' ,'views', view);
    }
}

module.exports = BaseController;