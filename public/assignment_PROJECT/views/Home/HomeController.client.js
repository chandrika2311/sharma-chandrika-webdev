/**
 * Created by chandrika2311 on 4/19/17.
 */
/**
 * Created by chandrika2311 on 4/13/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("HomeController", HomeController);

    function HomeController(UserService, UdacityService,$routeParams, $location, $rootScope) {
        vm = this;
        vm.courses  = [];
        vm.studentlogin = studentlogin;
        vm.mentorlogin = mentorlogin;

        function init() {

        }init();
        function studentlogin() {
            $location.url('/student/login');

        }
        function mentorlogin() {
            $location.url('/mentor/login');

        }

    }

})();
