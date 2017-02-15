/**
 * Created by chandrika2311 on 2/8/17.
 */
/** this controller is being executed on the browser and its controller
 interpret user input and manipulate tsome model data and provide it to the user **/

(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location){ /** no scope used any more**/
        var vm = this; /**   this is the variable which sends data to the page and the
                                    page interacts with the data and send s it back       **/
        vm.login = login;
        function initial() {
            vm.hello = "hello my friend";
        }
        initial();

        function login(user) {
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null) {
                $location.url('/profile/' + loginUser._id);
            } else {
                vm.error = 'user not found';
            }
        }
    }

    })();