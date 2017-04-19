/**
 * Created by chandrika2311 on 4/13/17.
 */

(function () {
    angular
        .module("MentorStudentApp")
        .factory("UdacityService",UdacityService);

    function UdacityService($http) { //helps in creation interaction with any server.

        var api = {
            "findCourses":findCourses,
            "findcoursebyKey":findcoursebyKey,
            "findAllCourses":findAllCourses,
            "enrollToCourse":enrollToCourse,
            "deleteCourse":deleteCourse,
            "findCourseForStudent":findCourseForStudent,
            "findCourseById":findCourseById
        };
        return api;

        function findCourses() {
            var url = "https://www.udacity.com/public-api/v0/courses";
            return $http.get(url);
        }
        function enrollToCourse(userId, course) {
            return $http.post("/api/udacity/student/"+userId+"/enroll/"+course.key, course);
        }
        function findCourseForStudent(userId) {
            return $http.get('/api/udacity/student/'+userId+'/course');
        }
        function findCourseById(courseId) {
            return $http.get("/api/udacity/course/"+courseId);

        }
        function findAllCourses() {
            return $http.get('/api/allCourses');

        }
        function deleteCourse(course) {
            var courseId = course._id;
            return $http.delete('/api/course/'+courseId,course);

        }
        function findcoursebyKey(key) {
            return $http.get('/api/course/'+key);

        }

    }
})();