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
        vm.error = "";

        function initial() {
            vm.error = "";
        }
        initial();

        function register(user) {
            vm.error = "";
            if(user != undefined){
                user.role = "student";
                if(user.username == undefined || user.password == undefined){
                    vm.error = "Cannot leave username or password empty";
                    return;
                }
                if(user.password != user.repassword1){
                    vm.error = "Password and comfirm password should match";
                    return;
                }
                x = user.email;
                var atpos = x.indexOf("@");
                var dotpos = x.lastIndexOf(".");
                if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
                    alert("Not a valid e-mail address");
                    return false;
                }

                if(vm.error === ""){
                    UserService
                        .register(user)
                        .then(
                            function(response) {
                                var newuser = response.data;
                                $rootScope.currentUser = newuser;
                                $location.url('/navigate/'+newuser._id);
                            })

                }


            }else{
                vm.error = "User Not defined properly";
                return;
            }
            }


    }
})();

