/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("StudentProfileController", StudentProfileController);

    function StudentProfileController($routeParams, UserService, ProjectService,UdacityService, $location,$rootScope){ /** no scope used any more**/
    var vm = this;
        vm.courses1 = [];
        vm.courses = [];
        vm.userId = $rootScope.currentUser._id;
        vm.applications_ids = [];
        vm.applications = [];
        vm.updateUser = updateUser;
        vm.manageProjects = manageProjects;
        vm.ManageCourses = ManageCourses;
        vm.logout = logout;
        vm.user = "";
        vm.mentors = [];
        vm.mentors1 = [];
        vm.projects =[];
        vm.projects1 =[];

        function init() {
            vm.user = $rootScope.currentUser;
            renderUser(vm.user);

        }
        init();
        function ManageCourses(userId) {
            $location.url('/student/course');

        }
        function updateUser(newUser) {

            $location.url('/student/update');
        }

        function renderUser(user) {
            vm.user = user;
            vm.application_ids = user.ProjectApplications;
            vm.courses1 = user.courses;
            vm.projects1 = user.projects;

            for(count = 0; count < vm.projects1.length; count++){
                var value1 = vm.projects1[count];

                ProjectService.findProjectById(value1)
                    .success(function (project_found) {
                            vm.projects.push(project_found);
                            vm.mentors1.push(project_found._Mentor);
                            for(count = 0; count< vm.mentors1.length; count++){
                                UserService.findUserById(vm.mentors1[count])
                                    .success(function (mentor_info) {
                                        vm.mentors.push(mentor_info);
                                    })
                            }
                        }
                    )}



            for(count = 0; count < vm.application_ids.length; count++){
                var value = vm.application_ids[count];

                ProjectService.findProjectById(value)
                    .success(function (project_found) {
                            vm.applications.push(project_found);

                        }
                    )}


            for(count = 0; count < vm.courses1.length; count++){
                value = vm.courses1[count];

                UdacityService.findCourseById(value)
                    .success(function (course_found) {
                            vm.courses.push(course_found);
                        }
                    )}
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/student/login");
                    })
        }
        function manageProjects() {
            $location.url('/student/projects');
        }

    }
})();
