/**
 * Created by chandrika2311 on 4/13/17.
 */

module.exports = function (app, CourseModel) {

    app.post('/api/udacity/student/:userId/enroll/:cid', enrolToCourse);
    app.get('/api/allCourses', findAllCourses);
    // app.get('/api/course/:key', findcoursebyKey);
    app.get('/api/udacity/student/:userId/course', findAllCoursesForStudent);
    app.get('/api/udacity/course/:courseId', findCourseById);
    app.delete('/api/course/:courseId',deleteCourse);

    // function findcoursebyKey(req,res) {
    //     var key = req.params.key;
    //     CourseModel.findcoursebyKey(key)
    //         .then(function (course) {
    //             res.send(course)
    //
    //         })
    //
    // }
    function deleteCourse(req,res) {
        var courseId = req.params.courseId;
        CourseModel.deleteCourse(courseId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            })
    }

    function findAllCourses(req,res) {
        CourseModel.findAllCourses()
            .then(function(courses) {

            res.send(courses);
        }, function (error) {
            res.sendStatus(400).send(error);
        });

    }
    function enrolToCourse(req,res){

        var newCourse = req.body;
        var userId = req.params.userId;

        CourseModel
            .createCourse(userId, newCourse)
            .then(function(course) {

                res.send(course);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }
    function findAllCoursesForStudent(req, res) {
        var studentId = req.params.studentId;
        console.log("reached udacity service for list of courses");
        CourseModel
            .findAllCoursesForStudent(studentId)
            .then(function(courses) {
                res.json(courses);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }
    function findCourseById(req, res) {
        var courseId = req.params.courseId;
        CourseModel.findCourseById(courseId)
            .then(function (course) {
                res.json(course);
            },function (err) {
                res.sendStatus(400).send(error);
            })
    }
};
