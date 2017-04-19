/**
 * Created by chandrika2311 on 2/14/17.
 */


(function(){
    angular
        .module("MentorStudentApp")
        .controller("MentorRegisterController", MentorRegisterController);

    function MentorRegisterController(UserService, $location,$rootScope){ /** no scope used any more**/
    var vm = this;
    vm.register = register;
        function initial() {
            vm.hello = "hello my friend";
        }
        initial();

        function register(user) {
            user.role = "mentor";
            UserService
                .register(user)
                .then(
                    function(response) {
                        var newuser = response.data;
                        $rootScope.currentUser = newuser;
                        $location.url('/mentor/createProject');
                    })

        }
    }
})();

