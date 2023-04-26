var homecontroller = require('../controller/home');
var Tools = require('../tools');
module.exports = function (app) {
    app.route('/').get(Tools.isLoggedIn,homecontroller.home);
    app.route('/').post(Tools.isLoggedIn,homecontroller.home);

    app.route('/login').get(homecontroller.login);
    app.route('/login').post(homecontroller.login);

    app.route('/signup').get(homecontroller.signup);
    app.route('/signup').post(homecontroller.signup);

    app.route('/blank').get(Tools.isLoggedIn,homecontroller.blank);
    app.route('/blank').post(Tools.isLoggedIn,homecontroller.blank);
}
