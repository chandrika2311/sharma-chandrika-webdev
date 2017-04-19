/**
 * Created by chandrika2311 on 4/18/17.
 */
/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("AdminManageProject", AdminManageProject);

    function AdminManageProject($routeParams, UserService,UdacityService, $location,$rootScope,ProjectService,loggedin){ /** no scope used any more**/
    var vm = this;
        vm.error = "";
        vm.projectId = $routeParams.pid;
        vm.project ="";
        vm.deleteProject = deleteProject;
        vm.updateProject = updateProject;

        vm.logout = logout;



        function init() {

            vm.projectId = $routeParams.pid;
            ProjectService.findProjectById(vm.projectId)
                .then(function (project) {
                    console.log("project", project);
                    console.log("project data", project.data);
                    vm.project = project.data;
                })
        }init();

        function updateProject(project) {
            ProjectService.updateProject(vm.projectId, vm.project)
                .success(function (response) {
                    $location.url('/admin/projects');
                })
                .error(function (err) {
                    vm.error = "unable to update user";
                });
        }


        function deleteProject(project) {
            var mentor = project._Mentor;
            var students_working = project.StudentWorking;
            students_working.push(mentor);

            for(i = 0; i< students_working.length;i++){
                UserService.spliceProjectFromUser(students_working[i],project);
            }
            ProjectService.deleteProject(project)
                .success(function (response) {
                    $location.url('/admin/projects');

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
