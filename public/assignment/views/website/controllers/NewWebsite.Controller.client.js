/**
 * Created by chandrika2311 on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;

                });
        }
        init();

        function createWebsite (website) {
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function (website) {
                    $location.url("/user/"+vm.userId+"/website");

                });
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);

        };
    }
})();