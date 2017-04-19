/**
 * Created by chandrika2311 on 4/18/17.
 */
/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("AdminManageController", AdminManageController);

    function AdminManageController($routeParams, UserService,UdacityService, $location,$rootScope,ProjectService,loggedin){ /** no scope used any more**/
    var vm = this;
        vm.error = "";
        vm.manageUsers = manageUsers;
        vm.updateUser = updateUser;
        vm.manageProjects = manageProjects;
        vm.manageCourses = manageCourses;
        vm.logout = logout;
        vm.users = [];
        vm.projects = [];
        vm.courses = [];


        function init() {
            //get all the information in the database:
            if ($rootScope.currentUser.role == "admin") {
                UserService.getAllUsers()
                    .success(function (users) {
                        vm.users = users;
                        console.log("users",users);
                    })
                    .error(function (err) {
                        vm.error = "Error while finding users";

                    });
                UdacityService.findAllCourses()
                    .success(function (courses) {
                        vm.courses = courses;
                        console.log("courses",courses);
                    })
                    .error(function (err) {
                        vm.error = "Error while finding course";
                    });
                ProjectService.findAllProjects()
                    .success(function (projects) {
                        vm.projects = projects;
                        console.log("projects",projects);
                    })
                    .error(function (err) {
                        vm.error = "Error while finding projects";
                    })
            }
            else{
                vm.error("Unauthorized");
            }

        }init();


        function manageUsers(users) {
            $location.url('/admin/users');


        }
        function updateUser(userId, role) {
            $location.url('/admin/update/user/'+userId);

        }
        function manageCourses(courses) {
            $location.url('/admin/courses');


        }
        function manageProjects(projects) {
            $location.url('/admin/projects');


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
