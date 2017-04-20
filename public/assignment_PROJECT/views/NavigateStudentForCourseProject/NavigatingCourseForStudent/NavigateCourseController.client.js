/**
 * Created by chandrika2311 on 4/13/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("NavigateCourseController", NavigateCourseController);

    function NavigateCourseController(UdacityService,UserService, $routeParams, $location, $rootScope) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        vm.course_exists = 0;
        vm.searchCourseNow = searchCourseNow;
        vm.enrolIntoCourse = enrolIntoCourse;
        vm.CourseDetails = CourseDetails;
        vm.logout = logout;
        vm.viewMyCourses = viewMyCourses;
        vm.error = "";

        vm.keyPresent = [];
        vm.coursedetails = "";
        vm.instructors = "";

        function init() {
            vm.error = "";

        vm.coursedetails = $rootScope.coursedetails;
        vm.instructors = $rootScope.instructors;
        }init();
        function searchCourseNow(keyword) {
            UdacityService
                .findCourses()
                .success(function (response) {
                    vm.keyPresent = [];
                    vm.error = "";
                    vm.courses = response.courses;
                    for(x in vm.courses){
                        var str = vm.courses[x].expected_learning;
                        if(str.includes(keyword) === true){
                            var value = vm.courses[x];
                            vm.keyPresent.push(value);
                        }
                    }
                    if(vm.keyPresent.length < 1){
                        vm.error = 'No Courses Found, Try another search criteria';
                    }

                });


        }
        function CourseDetails(course) {

            console.log(course.required_knowledge);

            $rootScope.coursedetails = course;
            $rootScope.instructors = course.instructors;
            $location.url("/navigate/courseSearch/course/"+course.key);


        }
        function enrolIntoCourse(userId,course) {

            UserService.findUserById(userId)
                .then(function (user_found) {
                    var courses = user_found.data.courses;
                    for (count = 0 ; count<courses.length;count++){
                        UdacityService.findCourseById(courses[count])
                            .success(function (course_det) {
                                console.log("course detail",course_det);
                                if(course_det.key == course.key){
                                    vm.course_exists = 1;
                                }
                            })
                    }
                    if (vm.course_exists == 1){
                        vm.error = "Already enrolled in the course";
                    }else{UdacityService
                                    .enrollToCourse(userId,course)
                                    .success(function (response) {
                                        $location.url("/student/course");
                                    })
                                    .error(function (err) {
                                        vm.error = err;
                                    });

                }}
                )
        }
        function viewMyCourses() {
                    $location.url("/student/course");
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
        }
    }

})();
