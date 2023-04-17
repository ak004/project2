var homecontroller = require('../controller/home');
module.exports = function (app) {
    app.route('/').get(homecontroller.home);
    app.route('/').post(homecontroller.home);
}
