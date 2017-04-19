/**
 * Created by chandrika2311 on 4/13/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("NavigationController", NavigationController);

    function NavigationController($location,$routeParams,UserService) {
        var vm = this;
        vm.getcourses = getcourses;
        vm.logout = logout;
        vm.getMentors = getMentors;
        vm.userId = $routeParams.uid;
        vm.mentors = [];
        function getcourses() {
            $location.url('/navigate/'+vm.userId+"/courseSearch");
        }
        function getMentors() {
            $location.url("/student/"+vm.userId+"/navigate/mentorSearch");
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

