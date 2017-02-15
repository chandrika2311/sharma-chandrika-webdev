/**
 * Created by chandrika2311 on 2/14/17.
 */


(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService){ /** no scope used any more**/
    var vm = this; /**   this is the variable which sends data to the page and the
     page interacts with the data and send s it back       **/

    vm.register = register;

        function initial() {
            vm.hello = "hello my friend";
        }
        initial();

        function register(user) {
            var loginUser = UserService.createUser(user);
            if(loginUser == null) {
                vm.error = "User already exists";
            } else {
                vm.message = "user successfully created";
            }
        }
    }
})();
