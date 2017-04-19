/**
 * Created by chandrika2311 on 4/13/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("CourseListController", CourseListController);

    function CourseListController(UserService, UdacityService,$routeParams, $location, $rootScope) {
        vm = this;
        vm.userId = $rootScope.currentUser._id;
        vm.courses  = [];
        vm.CourseDetails = CourseDetails;
        vm.gotoCourseSearch = gotoCourseSearch;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
        }
        function init() {
            console.log(vm.userId);
            UserService.findCourseForUser(vm.userId)
                .success(function (response) {
                        vm.courses1 = response.courses;
                    for(count = 0; count < vm.courses1.length; count++){
                        value = vm.courses1[count];


                        UdacityService.findCourseById(value)
                            .success(function (course_found) {
                                vm.courses.push(course_found);
                                }
                            )
                    }
                    })
                .error(function (err) {
                    vm.error = err;
                    console.log("err:",err);

                });
            vm.coursedetails = $rootScope.coursedetails;
            vm.instructors = $rootScope.instructors;
        }init();
        function CourseDetails(course) {

            $rootScope.coursedetails = course;
            $rootScope.instructors = course.instructors;
            $location.url("/navigate/courseSearch/course/"+course.key);


        }
        function gotoCourseSearch() {
            $location.url('/navigate/'+vm.userId+'/courseSearch');

        }
    }

})();
