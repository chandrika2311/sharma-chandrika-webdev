/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController(){ /** no scope used any more**/
        var vm = this; /**   this is the variable which sends data to the page and the
        page interacts with the data and send s it back       **/

        vm.profile = profile;
        function initial() {
            vm.hello = "hello my friend";
        }
        initial();

        function profile(user) {
            console.log('Profile inside controler');
        }
    }
})();
