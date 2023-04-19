var homecontroller = require('../controller/home');
module.exports = function (app) {
    app.route('/').get(homecontroller.home);
    app.route('/').post(homecontroller.home);

    app.route('/login').get(homecontroller.login);
    app.route('/login').post(homecontroller.login);

    app.route('/signup').get(homecontroller.signup);
    app.route('/signup').post(homecontroller.signup);

    app.route('/blank').get(homecontroller.blank);
    app.route('/blank').post(homecontroller.blank);
}
