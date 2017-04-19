/**
 * Created by chandrika2311 on 3/21/17.
 */
var mongoose = require('mongoose');

var ProjectSchema = mongoose.Schema({
    Title: String,
    _Mentor: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
    Description: String,
    ConceptsInvolved: String,
    Skillset: String,
    BasicRequirements: String,
    CourseRequirements: String,
    StudentWorking:[{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
    Applications:[{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
    phone: String,
    dateCreated: Date
},{collection:'Project.Database'});
module.exports = ProjectSchema;// puts something in the namespace for someone else outside to use it.