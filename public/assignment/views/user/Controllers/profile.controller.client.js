/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService){ /** no scope used any more**/
        var vm = this;
        var userId =  $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function updateUser(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        }
        function deleteUser(){
            var user = UserService.deleteUser(userId);
            $location.url("/login");
        }

        var user = UserService.findUserById(userId);
        vm.user = user;
        console.log(user);
    }
})();
