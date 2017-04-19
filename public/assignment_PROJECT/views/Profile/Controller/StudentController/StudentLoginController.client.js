/**
 * Created by chandrika2311 on 2/8/17.
 */
/** this controller is being executed on the browser and its controller
 interpret user input and manipulate tsome model data and provide it to the user **/

(function(){
    angular
        .module("MentorStudentApp")
        .controller("StudentLoginController", StudentLoginController);

    function StudentLoginController(UserService, $location, $rootScope) {
        /** no scope used any more**/
        var vm = this;
        /**   this is the variable which sends data to the page and the
         page interacts with the data and send s it back       **/
        vm.login = login;
        vm.logout = logout;
        function initial() {

            if ($rootScope.currentUser != null) {
                if($rootScope.currentUser.role =="admin"){
                    $location.url('/admin');
                }else{
                    $location.url('/student');
                }

            }
            vm.error = "";
        }
        initial();
        function login(user) {

            if (user == null) {
                vm.error = "Please enter your details";
                return;
            }
            UserService.
            findUserByUsername(user.username)
                .success(function (response) {
                    if(response != ""){


                    UserService.login(user)
                        .then(
                            function (response) {
                                var user = response.data;
                                if (user.role == "student") {
                                    $rootScope.currentUser = user;
                                    // $location.url('/mentor/'+user._id);
                                    $location.url('/student');

                                }
                                if (user.role == "admin") {
                                    $rootScope.currentUser = user;
                                    // $location.url('/mentor/'+user._id);
                                    $location.url('/admin');

                                }
                                else {
                                    vm.error = "Invalid Credentials";
                                }

                            },function (err) {
                                vm.error = "Invalid Credentials";

                            });
                    }else{
                        vm.error = "Invalid Credentials";
                    }

                },function (err) {
                    vm.error = "Invalid Credentials";
                });
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