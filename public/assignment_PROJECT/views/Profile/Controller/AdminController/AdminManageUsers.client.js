/**
 * Created by chandrika2311 on 4/18/17.
 */
/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("AdminManageUsers", AdminManageUsers);

    function AdminManageUsers($routeParams, UserService,UdacityService, $location,$rootScope,ProjectService,loggedin){ /** no scope used any more**/
    var vm = this;
        vm.error = "";
        vm.userId = $routeParams.uid;
        vm.user ="";
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;


        vm.logout = logout;



        function init() {
            //get all the information in the database:
            if ($rootScope.currentUser.role == "admin") {
                UserService.findUserById(vm.userId)
                    .success(function (user) {
                        vm.user = user;

                    })
                    .error(function (err) {
                        vm.error = "Error while finding user";

                    });
            }
            else{
                vm.error("Unauthorized");
            }

        }
        init();

        function updateUser(user) {
            UserService.updateUser(vm.userId, vm.user)
                .success(function (response) {
                    vm.message = "user successfully updated";
                    $location.url('/admin/users');
                })
                .error(function (err) {
                    vm.error = "unable to update user";
                });


        }
        function deleteStudent(user) {
            var projects = user.projects;
            var courses = user.courses;
            for (a = 0; a < courses.length ; a++){
                UdacityService.deleteCourse(courses[a]);
            }
            for (b = 0; b < projects.length ; b++){
                ProjectService.findProjectById(projects[b])
                    .success(function (project) {
                        var students_working = project.StudentWorking;
                        var index = students_working.indexOf(user._id);
                        if (index > -1){
                            students_working.splice(index,1);
                            project.StudentWorking = students_working;
                            project.save();


                        }});
            }


        }
        function deleteMentor(user) {
            var projects = user.projects;

                for (b = 0; b < projects.length ; b++){
                    ProjectService.deleteProject(projects[b]);
                            }
                }


        function deleteUser(user) {
            if (user.role =="student") {
                deleteStudent(user);
                }

            if (user.role =="mentor") {
                deleteMentor(user);
            }

            UserService.deleteUser(vm.userId)
                .success(function (response) {
                    vm.message = "user successfully deleted";
                    $location.url('/admin/users');
                })
                .error(function (err) {
                    vm.error = "unable to update user";
                });

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
/**
 * Created by chandrika2311 on 4/18/17.
 */
