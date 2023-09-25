var homecontroller = require('../controller/home');
var Tools = require('../tools');
module.exports = function (app) {

    
    app.route('/images/:key').get(homecontroller.showimage);
    app.route('/vids/:key').get(homecontroller.showvids);
    app.route('/attachments/:key').get(homecontroller.showattachement);

    app.route('/').get(Tools.isLoggedIn,homecontroller.home);
    app.route('/').post(Tools.isLoggedIn,homecontroller.home);

    app.route('/login').get(homecontroller.login);
    app.route('/login').post(homecontroller.login);
    app.route('/api/login').post(homecontroller.login);

    app.route('/signup').get(homecontroller.signup);
    app.route('/signup').post(homecontroller.signup);
    app.route('/api/signup').post(homecontroller.signup);

    app.route('/send_verification').get(homecontroller.send_verification);
    app.route('/send_verification').post(homecontroller.send_verification);

    app.route('/api/send_verification').post(homecontroller.send_verification);

    app.route('/logout').get(homecontroller.logout);
    app.route('/logout').post(homecontroller.logout);

    app.route('/menu').get(Tools.isLoggedIn,homecontroller.menu);
    app.route('/menu').post(Tools.isLoggedIn,homecontroller.menu);
    app.route('/new_menu').post(Tools.isLoggedIn,homecontroller.new_menu);
    app.route('/delete_menu').post(Tools.isLoggedIn,homecontroller.delete_menu);
 
    app.route('/pages').get(Tools.isLoggedIn,homecontroller.pages);
    app.route('/pages').post(Tools.isLoggedIn,homecontroller.pages);
    app.route('/new_page').post(Tools.isLoggedIn,homecontroller.new_page);


    app.route('/profile').get(Tools.isLoggedIn,homecontroller.profile);
    app.route('/profile').post(Tools.isLoggedIn,homecontroller.profile);
    app.route('/updata_user_data').post(Tools.isLoggedIn,homecontroller.updata_user_data);

    app.route('/blank').get(Tools.isLoggedIn,homecontroller.blank);
    app.route('/blank').post(Tools.isLoggedIn,homecontroller.blank);

    
    app.route('/catagories').get(Tools.isLoggedIn,homecontroller.catagories);
    app.route('/catagories').post(Tools.isLoggedIn,homecontroller.catagories);
    app.route('/new_catagory').post(Tools.isLoggedIn,homecontroller.new_catagory);

    app.route('/modules').get(Tools.isLoggedIn,homecontroller.modules);
    app.route('/modules').post(Tools.isLoggedIn,homecontroller.modules);
    app.route('/save_modules').post(Tools.isLoggedIn,homecontroller.save_modules);
    app.route('/delete_modules').post(Tools.isLoggedIn,homecontroller.delete_modules);

    app.route('/upload_videos').get(Tools.isLoggedIn,homecontroller.upload_videos);
    app.route('/upload_videos').post(Tools.isLoggedIn,homecontroller.upload_videos);
    app.route('/save_video').post(Tools.isLoggedIn,homecontroller.save_video);
    app.route('/initiateUpload').post(Tools.isLoggedIn,homecontroller.initiateUpload);
    app.route('/upload').post(Tools.isLoggedIn,homecontroller.upload);
    app.route('/completeUpload').post(Tools.isLoggedIn,homecontroller.completeUpload);
    app.route('/delete_video').post(Tools.isLoggedIn,homecontroller.delete_video);


    //
    app.route('/qr_validation').post(homecontroller.qr_validation);
    app.route('/auth_user').post(homecontroller.auth_user);

}
