/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $location){ /** no scope used any more**/
        var vm = this;
        var userId =  $routeParams.uid;
        vm.unregisterUser = unregisterUser;
         vm.update = function (newUser) {
            var user = UserService.updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated";
                })
                .error(function (err) {
                    vm.error = "unable to update user";
                });
        };

        function init() {
               UserService
                    .findUserById(userId)
                    .success(renderUser);
        }
        init();
        function renderUser(user) {
            vm.user = user;
            console.log(user);
        }
        function unregisterUser(user) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer){
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }
    }
})();
