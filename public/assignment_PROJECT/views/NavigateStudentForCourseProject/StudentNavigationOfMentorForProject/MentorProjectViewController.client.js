/**
 * Created by chandrika2311 on 4/16/17.
 */
/**
 * Created by chandrika2311 on 4/13/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("MentorProjectViewController", MentorProjectViewController);

    function MentorProjectViewController($location,$routeParams,UserService,$rootScope,ProjectService) {
        var vm = this;
        vm.mentorId = $routeParams.mid;
        vm.logout = logout;
        vm.studentId = $routeParams.uid;
        vm.projectId = $routeParams.pid;
        vm.project_details = "";
        vm.error = "";
        vm.ApplytoProject = ApplytoProject;

        vm.mentors = [];
        function init() {
            ProjectService.findProjectById(vm.projectId)
                .success(function (project_det) {
                        vm.project_details = project_det
                })
                .error(function (err) {
                    vm.error = err;
                })
        }
        init();
        function ApplytoProject(studentId, projectId) {
            ProjectService.addStudentApplication(studentId,projectId)
                .success(function (message) {
                   $location.url('/student/'+vm.studentId);
                });
            //updates Project database and student database


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

