/**
 * Created by chandrika2311 on 4/18/17.
 */
/**
 * Created by chandrika2311 on 4/18/17.
 */
/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("AdminManageCourseController", AdminManageCourseController);

    function AdminManageCourseController($routeParams, UserService,UdacityService, $location,$rootScope,ProjectService,loggedin){ /** no scope used any more**/
        vm = this;
        vm.deleteCourse = deleteCourse;
        vm.logout = logout;
        vm.course = "";

        function init() {
            vm.courseId = $routeParams.cid;
            UdacityService.findCourseById(vm.courseId)
                .then(function (course) {
                    vm.course = course.data;

                })


        }init();

        function deleteCourse(course) {
            UdacityService.deleteCourse(course)
                .success(function (response) {
                    $location.url('/admin/courses');

                })

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
