/**
 * Created by chandrika2311 on 4/17/17.
 */
/**
 * Created by chandrika2311 on 4/15/17.
 */
(function() {
    angular
        .module("MentorStudentApp")
        .controller("ProjectDetailsController", ProjectDetailsController);

    function ProjectDetailsController(ProjectService, $location, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.projects = [];
        vm.projectId = $routeParams.pid;
        vm.userId = $rootScope.currentUser._id;
        vm.project_details = "";


        function init() {
            vm.user = $rootScope.currentUser;
                    vm.projects = vm.user.projects;
                    for (count = 0; count < vm.projects.length; count++) {
                        var proId = vm.projects[count];
                        if (proId == vm.projectId) {
                            ProjectService.findProjectById(proId)
                                .success(function (project_found) {
                                    vm.project_details = project_found;
                                 })
                        }}

        }init();

        }

})();
