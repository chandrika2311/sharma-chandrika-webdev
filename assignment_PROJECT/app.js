module.exports = function (app) {
    var model = require('./models/models.server1.js')();
    require('./services/udacity.service.server')(app, model.CourseModel);
    require('./services/project.service.server')(app,model.ProjectModel);
    require('./services/user.service.server')(app,model.UserModel);
};