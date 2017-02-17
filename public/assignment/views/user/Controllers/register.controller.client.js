/**
 * Created by chandrika2311 on 2/14/17.
 */


(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location){ /** no scope used any more**/
    var vm = this; /**   this is the variable which sends data to the page and the
     page interacts with the data and send s it back       **/
    vm.register = register;



        function initial() {
            vm.hello = "hello my friend";
        }
        initial();

        function register(user){
            var registerUser = UserService.findUserByCredentials(user.username, user.password);
            if(registerUser === null) {
                var newUser = UserService.createUser(user);
                $location.url('/user/'+ newUser._id);}
            else {vm.error = "User Already Exists";}
        }
    }
})();
