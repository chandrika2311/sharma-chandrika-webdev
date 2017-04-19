/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("MentorProfileController", MentorProfileController);

    function MentorProfileController($routeParams, UserService, $location,$rootScope,ProjectService,loggedin){ /** no scope used any more**/
    var vm = this;
    vm.error = "";

        vm.userId = "";
        vm.logout = logout;
        vm.updateUser = updateUser;
        vm.manageProjects = manageProjects;
        vm.projects = [];
        vm.projects1 = [];
        vm.studentList = studentList;
        vm.student_applications = [];
        vm.update = update;
        vm.getStudentInfo = getStudentInfo;
        vm.working_student_list = [];
        vm.message = "";
        vm.error = "";

        function init() {

            vm.userId = $rootScope.currentUser._id;
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                    vm.projects1 = user.projects;
                    for(count = 0; count < vm.projects1.length; count++){
                        value = vm.projects1[count];
                        ProjectService.findProjectById(value)
                            .success(function (project_found) {
                                // console.log(project_found);
                                vm.projects.push(project_found);
                                var sapplication = project_found.Applications;

                                for(j = 0; j < sapplication.length; j++ ){
                                    //Users that have applied to projects
                                    UserService.findUserById(sapplication[j])
                                        .success(function (student) {
                                            var student_app = {
                                                student_id : student._id,
                                                student_fname : student.firstname,
                                                student_lname : student.lastname,
                                                project_id : project_found._id,
                                                project_Title : project_found.Title
                                            };
                                            vm.student_applications.push(student_app);
                                            console.log(vm.student_applications)
                                        })
                                        .error(function (err) {
                                            vm.error = err;

                                        });
                                    //Users that are working on projects:

                                }
                                var studentsworking = project_found.StudentWorking;
                                for(j = 0; j < studentsworking.length; j++ ) {
                                    UserService.findUserById(studentsworking[j])
                                        .success(function (working_student) {
                                            var student_working_student = {
                                                student_id: working_student._id,
                                                student_fname: working_student.firstname,
                                                student_lname: working_student.lastname,
                                                project_id: project_found._id,
                                                project_Title: project_found.Title,
                                                project_Desc: project_found.Description,
                                                project_ConceptsInvolved: project_found.ConceptsInvolved


                                            };
                                            vm.working_student_list.push(student_working_student);

                                        })
                                        .error(function (err) {
                                            vm.error = err;

                                        });
                                    //Users that are working on projects:

                                }
                            });
                    }
                });
        }
        init();

        function update(newUser) {
            var user = UserService.updateUser(vm.userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated";
                    $location.url('/mentor');

                })
                .error(function (err) {
                    vm.error = "unable to update user";
                });
        }
        function updateUser(newUser) {

            $location.url('/mentor/update');
        }
        function manageProjects() {
            $location.url("/mentor/projects");
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
        function getStudentInfo(studentId,projectId,mentorId) {
            $location.url('/mentor/'+mentorId+'/Application/student/'+studentId+'/project/'+projectId);

        }
        function studentList() {

            $location.url('/mentor/Student/List');

        }
    }
})();
