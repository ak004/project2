var apis = require('../controller/apis')
module.exports = function (app) {
    app.route('/api/catagories').post(apis.get_cat);
    app.route('/api/selected_catagories').post(apis.get_selected_cat);
    app.route('/api/trending_course').post(apis.trending_course);
    app.route('/api/all_trending_course').post(apis.all_trending_course);
    app.route('/api/get_top_mentors').post(apis.get_top_mentors);
    app.route('/api/get_selected_course').post(apis.get_selected_course);
    app.route('/api/get_course_details').post(apis.get_course_details);
}