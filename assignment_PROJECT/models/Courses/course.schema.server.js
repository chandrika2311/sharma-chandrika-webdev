/**
 * Created by chandrika2311 on 4/14/17.
 */

var mongoose = require('mongoose');

var CourseSchema = mongoose.Schema({
    _user: [{type: mongoose.Schema.Types.ObjectId, ref: 'StudentModel'}],
    affiliates: String,
    banner_image:String,
    expected_duration:String,
    expected_duration_unit:String,
    expected_learning:String,
    faq:String,
    featured:String,
    full_course_available:String,
    homepage:String,
    image:String,
    instructors:[{bio:String,image: String, Name: String}],
    key:String,
    level:String,
    new_release:String,
    project_description:String,
    project_name:String,
    related_degree_keys:String,
    required_knowledge:String,
    short_summary:String,
    slug:String,
    starter:String,
    subtitle:String,
    summary:String,
    syllabus:String,
    title:String,
    tracks:String,
    dateCreated: {type:Date, default: Date.now()}
},{collection:'Project.courses'});
module.exports = CourseSchema;// puts something in the namespace for someone else outside to use it.