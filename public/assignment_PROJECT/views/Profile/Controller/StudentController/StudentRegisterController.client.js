/**
 * Created by chandrika2311 on 2/14/17.
 */


(function(){
    angular
        .module("MentorStudentApp")
        .controller("StudentRegisterController", StudentRegisterController);

    function StudentRegisterController(UserService, $location,$rootScope){ /** no scope used any more**/
    var vm = this;
        vm.register = register;
        vm.user = "";

        function initial() {

        }
        initial();

        function register(user) {
            user.role = "student";
            UserService
                .register(user)
                .then(
                    function(response) {
                        var newuser = response.data;
                        $rootScope.currentUser = newuser;
                        $location.url('/navigate/'+newuser._id);
                    })

        }
    }
})();

