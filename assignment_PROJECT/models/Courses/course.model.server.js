
var model = null;
var mongoose = require('mongoose');
var CourseSchema = require('./course.schema.server');
var CourseModel = mongoose.model('CourseModel',CourseSchema);


CourseModel.createCourse = createCourse;
CourseModel.findcoursebyKey = findcoursebyKey;
CourseModel.findAllCoursesForStudent = findAllCoursesForStudent;
CourseModel.findAllCourses = findAllCourses;
CourseModel.setModel = setModel;
// CourseModel.updateCourse = updateWebsite;

CourseModel.findCourseById = findCourseById;
CourseModel.deleteCourse = deleteCourse;

function setModel(_model) {
    model = _model;

}
function findcoursebyKey(key) {
    return CourseModel.findOne({key: key});

}
function createCourse(userId, course) {

    console.log("inside course model");
    var course_new = {
        _user: [],
        affiliates: course.affiliates,
        banner_image:course.banner_image,
        expected_duration:course.expected_duration,
        expected_duration_unit:course.expected_duration_unit,
        expected_learning:course.expected_learning,
        faq:course.faq,
        featured:course.featured,
        full_course_available:course.full_course_available,
        homepage:course.homepage,
        image:course.image,
        instructors:course.instructors,
        key:course.key,
        level:course.level,
        new_release:course.new_release,
        project_description:course.project_description,
        project_name:course.project_name,
        related_degree_keys:course.related_degree_keys,
        required_knowledge:course.required_knowledge,
        short_summary:course.required_knowledge,
        slug:course.slug,
        starter:course.starter,
        subtitle:course.subtitle,
        summary:course.summary,
        syllabus:course.syllabus,
        title:course.title,
        tracks:course.tracks
    };

    return CourseModel
        .create(course_new)
        .then(
            function(course_created){


                return model.UserModel.findUserById(userId)
                    .then(function (user) {

                        course_created._user.push(user._id);
                        course_created.save();

                        user.courses.push(course_created._id);
                        user.save();

                        return course;

                    },function (err) {

                        return err;
                    })
            },
            function(err){
                console.log("user err" + err);
                return err;
            });
}
function findAllCoursesForStudent(userId) {

    return model.UserModel.findOne({"_id": userId})
        .then(function (student) {
            console.log("student",student);
            console.log("student Coures:",student.courses);
            return student.courses;
            },function (err) {
            console.log("user err" + err);
            return err;
        })
}
function findCourseById(courseId) {
    return CourseModel.findOne({_id: courseId});
}
function findAllCourses() {
    return CourseModel.find({});

}
function deleteCourse(courseId){

    return CourseModel.remove({_id : courseId});

}


function recursiveDelete(pagesOfWebsite, websiteId) {
    if(pagesOfWebsite.length == 0){
        // All pages of website successfully deleted
        // Delete the website
        return CourseModel.remove({_id: websiteId})
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return response;
                }
            }, function (err) {
                return err;
            });
    }

    return model.PageModel.deletePageAndChildren(pagesOfWebsite.shift())
        .then(function (response) {
            if(response.result.n == 1 && response.result.ok == 1){
                return recursiveDelete(pagesOfWebsite, websiteId);
            }
        }, function (err) {
            return err;
        });
}

    function deleteWebsiteAndChildren(websiteId){
        // Delete the website and its children (pages)
        return CourseModel.findById({_id: websiteId}).select({'pages':1})
            .then(function (website) {
                var pagesOfWebsite = website.pages;
                return recursiveDelete(pagesOfWebsite, websiteId);
            } , function (err) {
                return err;
            });
}


module.exports = CourseModel;