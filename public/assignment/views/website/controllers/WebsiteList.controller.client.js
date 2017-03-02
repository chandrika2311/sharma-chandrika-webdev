/**
 * Created by chandrika2311 on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
       // vm.userId = $routeParams.uid;
        //vm.websiteId =  $routeParams.wid;

        function initial() {
            vm.userId = $routeParams.uid;

                WebsiteService
                    .findWebsitesByUser(vm.userId)
                    .success(function (websites) {
                        vm.websites = websites;
                    });
            // }
        }
        initial();

    }
})();