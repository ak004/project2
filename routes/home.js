var homecontroller = require('../controller/home');
var Tools = require('../tools');
module.exports = function (app) {
    app.route('/').get(Tools.isLoggedIn,homecontroller.home);
    app.route('/').post(Tools.isLoggedIn,homecontroller.home);

    app.route('/login').get(homecontroller.login);
    app.route('/login').post(homecontroller.login);

    app.route('/signup').get(homecontroller.signup);
    app.route('/signup').post(homecontroller.signup);

    app.route('/send_verification').get(homecontroller.send_verification);
    app.route('/send_verification').post(homecontroller.send_verification);

    app.route('/logout').get(homecontroller.logout);
    app.route('/logout').post(homecontroller.logout);

    app.route('/profile').get(Tools.isLoggedIn,homecontroller.profile);
    app.route('/profile').post(Tools.isLoggedIn,homecontroller.profile);
    app.route('/updata_user_data').post(Tools.isLoggedIn,homecontroller.updata_user_data);

    app.route('/blank').get(Tools.isLoggedIn,homecontroller.blank);
    app.route('/blank').post(Tools.isLoggedIn,homecontroller.blank);
}
