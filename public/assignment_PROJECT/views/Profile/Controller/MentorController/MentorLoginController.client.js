/**
 * Created by chandrika2311 on 2/8/17.
 */
/** this controller is being executed on the browser and its controller
 interpret user input and manipulate tsome model data and provide it to the user **/

(function(){
    angular
        .module("MentorStudentApp")
        .controller("MentorLoginController", MentorLoginController);

    function MentorLoginController(UserService, $location,$rootScope){ /** no scope used any more**/
    var vm = this; /**   this is the variable which sends data to the page and the
     page interacts with the data and send s it back       **/
    vm.login = login;
    vm.error = "";
        function initial() {
            if ($rootScope.currentUser != null) {
                if($rootScope.currentUser.role =="admin"){
                    $location.url('/admin');
                }if($rootScope.currentUser.role =="admin"){
                    $location.url('/mentor');
                }else{
                    $location.url('/');
                }

                vm.error = "";
                vm.hello = "hello my friend";
            }

        }
        initial();

        function login(user) {
            UserService.
            findUserByUsername(user.username)
                .success(function (response) {
                    if(response != ""){
                        UserService
                            .login(user)
                            .success(
                                function (response) {

                                    var user = response;
                                    if(user !=null){
                                        if(user.role =="mentor"){
                                            $rootScope.currentUser = user;
                                            // $location.url('/mentor/'+user._id);
                                            $location.url('/mentor');

                                        }
                                        if(user.role =="admin"){
                                            $rootScope.currentUser = user;
                                            // $location.url('/mentor/'+user._id);
                                            $location.url('/admin');

                                        }
                                        else{
                                            vm.error = "Invalid Credentials";
                                        }
                                    }
                                })
                            .error(function (error) {
                                vm.error = "Invalid Credentials";

                            });
                    }else{
                        vm.error = "Invalid Credentials";
                    }

                });



        }
    }

})();