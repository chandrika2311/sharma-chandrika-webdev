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
    vm.error = "";
        function initial() {
            vm.hello = "hello my friend";
        }
        initial();

        function register(user) {

                if(user != undefined){

                    if(user.username == undefined || user.password == undefined){
                        vm.error = "Cannot leave username or password empty";
                        return;
                    }
                    if(user.password != user.repassword){
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
            }else{
                    vm.error = "Please fill out details";
                }

    }}
})();

