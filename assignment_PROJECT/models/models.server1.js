/**
 * Created by chandrika2311 on 3/21/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var UserModel = require("./user/UserModel/user.model.server");
    var CourseModel = require("./Courses/course.model.server");
    var ProjectModel = require("./Projects/project.model.server");

    var model = {
        UserModel: UserModel,
        CourseModel: CourseModel,
        ProjectModel: ProjectModel

    };

    UserModel.setModel(model);
    CourseModel.setModel(model);
    ProjectModel.setModel(model);
    mongoose.connection.on('connected', function(){
    });
    return model;
};