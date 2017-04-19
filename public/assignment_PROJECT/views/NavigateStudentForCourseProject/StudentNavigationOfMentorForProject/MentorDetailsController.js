/**
 * Created by chandrika2311 on 4/16/17.
 */
/**
 * Created by chandrika2311 on 4/13/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("MentorDetailsController", MentorDetailsController);

    function MentorDetailsController($location,$routeParams,UserService,$rootScope,ProjectService) {
        var vm = this;
        vm.mentorId = $routeParams.mid;
        vm.studentId = $routeParams.uid;
        vm.checkProjectOut = checkProjectOut;
        vm.logout = logout;
        vm.user_details = "";
        vm.message = "";
        vm.user_projects = [];

        vm.mentors = [];
        function init() {
            UserService.findUserById(vm.mentorId)
                .success(function (user_details) {
                    vm.user_details = user_details;
                    var projects1 = user_details.projects;
                    for (count = 0; count < projects1.length; count++) {
                        var value = projects1[count];
                        ProjectService.findProjectById(value)
                            .success(function (project_found) {
                                vm.user_projects.push(project_found);
                                $location.url('/student/' + vm.studentId + '/navigate/mentorSearch/' + vm.mentorId);
                            })
                            .error(function (err) {
                                vm.message = "User information not available";

                            });
                    }
                })

        }
        init();

        function checkProjectOut(projectId) {
            $location.url("/student/"+vm.studentId+"/navigate/mentorSearch/"+vm.mentorId+"/project/"+projectId);
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

