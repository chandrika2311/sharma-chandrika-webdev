/**
 * Created by chandrika2311 on 4/14/17.
 */
/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("MentorStudentApp")
        .controller("StudentUpdateProfileController", StudentUpdateProfileController);

    function StudentUpdateProfileController($routeParams, UserService, $location,$rootScope){ /** no scope used any more**/
    var vm = this;
        vm.courses1 = [];
        vm.courses = [];
        vm.user = [];
        vm.error = "";
        vm.userId =  $rootScope.currentUser._id;
        vm.updateUser = updateUser;

        function init() {
            vm.user = $rootScope.currentUser;
        }

        init();

        function updateUser(newUser) {
            UserService.updateUser(vm.userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated";
                    $location.url('/student');
                })
                .error(function (err) {
                    vm.error = "unable to update user";
                });
        }
    }
})();
