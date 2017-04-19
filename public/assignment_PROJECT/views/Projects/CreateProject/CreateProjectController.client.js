/**
 * Created by chandrika2311 on 4/15/17.
 */
(function(){
    angular
        .module("MentorStudentApp")
        .controller("CreateProjectController", CreateProjectController);

    function CreateProjectController(ProjectService, $location, $routeParams,$rootScope,UserService) {
        var vm = this;
        vm.userId =  $rootScope.currentUser._id;
        vm.createProject = createProject;
        vm.project = "";
        vm.projects = [];

        function createProject(project) {
            ProjectService.createProject(vm.userId, project)
                .success(function (newProject) {
                    $location.url('mentor/projects');

                })
                .error(function () {

            });
        }

        }
    })();
/** no scope used any more**/