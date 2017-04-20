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
        vm.error = "";
        vm.course = "";

        function init() {
            vm.courseId = $routeParams.cid;
            UdacityService.findCourseById(vm.courseId)
                .then(function (course) {
                    vm.course = course.data;

                })


        }init();

        function deleteCourse(course) {
            users = course._user;

            UdacityService.deleteCourse(course)
                .success(function (response) {

                    for(a = 0; a < users.length ; a++){
                        return UserService.findUserById(users[a])
                            .success(function (user) {
                                var courselist = user.courses;
                                var index = courselist.indexOf(course._id);
                                if (index > -1){
                                    index = index + 1;
                                    courselist.splice(index,1);
                                }
                                user.courses = courselist;

                                $location.url('/admin/courses');
                                return user;
                            },function (error) {
                                vm.error = "Error in splice of users during course deletion";

                            })
                    }

                },function (error) {
                    vm.error = "Error in deletion of course";

                })

    }
    function createCourse() {
            UdacityService.createCourse()

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
