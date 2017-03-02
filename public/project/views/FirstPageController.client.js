/**
 * Created by chandrika2311 on 2/21/17.
 */
(function(){
    angular
        .module("DigitalMagazineMaker")
        .controller("FirstPageController", FirstPageController);

    function FirstPageController(){ /** no scope used any more**/
    var vm = this; /**   this is the variable which sends data to the page and the
     page interacts with the data and send s it back       **/
    vm.init = init;
        function initial() {
            vm.hello = "hello my friend";
        }
        initial();

        function init() {
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null) {
                $location.url('/user/' + loginUser._id);
            } else {
                vm.error = 'user not found';
            }
        }
    }

})();