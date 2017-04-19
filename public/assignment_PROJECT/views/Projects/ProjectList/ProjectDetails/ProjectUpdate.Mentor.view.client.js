/**
 * Created by chandrika2311 on 4/16/17.
 */
/**
 * Created by chandrika2311 on 4/15/17.
 */
(function(){
    angular
        .module("MentorStudentApp")
        .controller("ProjectUpdateController", ProjectUpdateController);

    function ProjectUpdateController(ProjectService, $location,$routeParams, $rootScope, UserService) {
        var vm = this;
        vm.updateProject = updateProject;
        vm.userId = $rootScope.currentUser._id;
        vm.projectId = $routeParams.pid;
        vm.project_details = "";


        function init() {
            UserService.findUserById(vm.userId)
                .success(function (old_user) {
                    if(old_user.role == "mentor"){
                        ProjectService.findProjectById(vm.projectId)
                            .success(function (project) {
                                vm.project_details = project;
                            });
                    }
                    if(old_user.role == "student") {
                        $location.url("/student/"+vm.userId+"/projects/"+$rootScope.project_details._id)
                    }
                });

        }
        init();

        function updateProject(project) {
            ProjectService.updateProject(vm.projectId,project)
                .success(function (updated_project){
                    $location.url('mentor/projects');
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
