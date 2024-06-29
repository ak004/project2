var apis = require('../controller/apis')
module.exports = function (app) {
    app.route('/api/catagories').post(apis.get_cat);
    app.route('/api/top_mentors').post(apis.top_mentors);
    app.route('/api/selected_catagories').post(apis.get_selected_cat);
    app.route('/api/trending_course').post(apis.trending_course);
    app.route('/api/similar_course').post(apis.similar_course);
    app.route('/api/all_trending_course').post(apis.all_trending_course);
    app.route('/api/get_top_mentors').post(apis.get_top_mentors);
    app.route('/api/get_selected_course').post(apis.get_selected_course);
    app.route('/api/get_course_details').post(apis.get_course_details);
    app.route('/api/get_vid_details').post(apis.get_vid_details);
    app.route('/api/buy_course').post(apis.buy_course);
    app.route('/api/ongoing_and_completed_course').post(apis.ongoing_and_completed_course);
    app.route('/api/change_to_completd').post(apis.change_to_completd);
    app.route('/api/top_resources').post(apis.top_resources);
    app.route('/api/update_download_count').post(apis.update_download_count);
    app.route('/api/get_chats').post(apis.get_chats);
    app.route('/api/send_chat').post(apis.send_chat);
    app.route('/api/test_chat').post(apis.test_chat);
}