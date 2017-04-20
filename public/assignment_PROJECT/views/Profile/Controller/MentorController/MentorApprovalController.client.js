(function(){
    angular
        .module("MentorStudentApp")
        .controller("MentorApprovalController", MentorApprovalController);

    function MentorApprovalController($routeParams, UserService, UdacityService, $location,$rootScope,ProjectService){
    var vm = this;
        vm.error = "";
        vm.studentId =  $routeParams.uid;
        vm.projects = [];
        vm.projects1 = [];
        vm.courses1 = [];
        vm.courses = [];
        vm.logout = logout;
        vm.approveStudent = approveStudent;
        vm.mentorId = $routeParams.mid;
        vm.projectId = $routeParams.pid;


        function init() {
            UserService
                .findUserById(vm.studentId)
                .success(function (user) {
                    vm.user = user;
                    vm.projects1 = user.projects;
                    vm.courses1 = user.courses;
                    for(count = 0; count < vm.courses1.length; count++){
                        var value = vm.courses1[count];


                        UdacityService.findCourseById(value)
                            .success(function (course_found) {
                                    vm.courses.push(course_found);
                                }
                            )
                    }
                    for(count1 = 0; count1 < vm.projects1.length; count1++){
                       var value1 = vm.projects1[count1];
                        ProjectService.findProjectById(value1)
                            .success(function (project_found) {
                                    vm.projects.push(project_found);
                                })}
                });
        }
        init();
        function approveStudent() {
            ProjectService.addProjectToStudentWorking(vm.studentId,vm.projectId,vm.mentorId)
                .success(function (response) {
                    console.log("accept response", response);
                    $location.url('/mentor');
                })

        }
        function declineStudent() {
            ProjectService.removeProjectfromApplication(vm.studentId,vm.projectId,vm.mentorId)
                .success(function (response) {
                    console.log("decline response", response);
                    $location.url('/mentor');
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
