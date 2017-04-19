/**
 * Created by chandrika2311 on 4/15/17.
 */
(function(){
    angular
        .module("MentorStudentApp")
        .controller("ProjectListController", ProjectListController);

    function ProjectListController(ProjectService, $location,$routeParams, $rootScope, UserService) {
        var vm = this;
        vm.projects = [];
        vm.logout = logout;
        vm.CourseRequirements = [];
        vm.projects1 = [];
        vm.updateProject = updateProject;
        vm.userId = $rootScope.currentUser._id;
        vm.mentor = "";

        vm.projectDetails = projectDetails;
        vm.createNewProject = createNewProject;

        function init() {

            vm.user = $rootScope.currentUser;
            UserService.findUserById(vm.userId)
                .success(function (mentor) {
                    vm.mentor = mentor;
                        vm.projects1 = mentor.projects;//array of projects
                    for(count = 0; count < vm.projects1.length; count++){
                        value = vm.projects1[count];
                        ProjectService.findProjectById(value)
                            .success(function (project_found) {
                                    vm.projects.push(project_found);
                                }
                            )
                    }
                });
            vm.project_details = $rootScope.project_details;
        }
        init();
        function createNewProject() {
            if(vm.mentor.role == "student"){
                //this is added so when user is student, we know they cant edit
                // projects so this takes them to the mentor search where they can apply for projects
                $location.url('/student/'+vm.userId+'/navigate/mentorSearch');
            }
            if(vm.mentor.role == "mentor"){
                //mentor/admin is allowed to create projects
                $location.url('/mentor/createProject');
            }
        }

        function projectDetails(project) {
            if(vm.mentor.role == "student"){
           $location.url('/student/projects/'+project._id);
        }
        if(vm.mentor.role =="mentor"){
                $location.url('/mentor/projects/'+project._id);
            }
        }
        function updateProject(project) {
            console.log("inside update project", project);
            ProjectService.updateProject(project)
                .success(function (updated_project) {
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
