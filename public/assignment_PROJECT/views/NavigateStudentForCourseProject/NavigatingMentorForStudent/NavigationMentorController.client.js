/**
 * Created by chandrika2311 on 4/13/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("NavigationMentorController", NavigationMentorController);

    function NavigationMentorController($location,$routeParams,UserService,$rootScope) {
        var vm = this;
        vm.getMentorDetails = getMentorDetails;
        vm.studentId = $routeParams.uid;
        vm.mentorId = "";
        vm.user_details = "";
        vm.message = "";
        vm.logout = logout;
        vm.user_projects = [];
        vm.error = "";

        vm.mentors = [];
        function init() {
            UserService.findAllMentors()
                .success(function (mentors) {
                    vm.mentors = mentors;
                });
        }init();

        function getMentorDetails(userId) {
            $location.url('/student/'+vm.studentId+'/navigate/mentorSearch/'+userId);

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

