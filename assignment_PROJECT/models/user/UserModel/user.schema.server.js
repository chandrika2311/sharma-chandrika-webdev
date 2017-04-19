/**
 * Created by chandrika2311 on 4/15/17.
 */

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    CompanyName: String,
    industry: String,
    firstname: String,
    lastname: String,
    email: String,
    projects:[{type: mongoose.Schema.Types.ObjectId, ref:'ProjectModel'}],
    courses: [{type: mongoose.Schema.Types.ObjectId, ref:'CourseModel'}],
    ProjectApplications:[{type: mongoose.Schema.Types.ObjectId, ref:'ProjectModel'}],
    phone: String,
    dateCreated: {type:Date, default: Date.now()},
    role:{type: String, default: "user", enum: ["student","mentor","admin"]}
},{collection:'Project.User'});

module.exports = UserSchema;// puts something in the namespace for someone else outside to use it.