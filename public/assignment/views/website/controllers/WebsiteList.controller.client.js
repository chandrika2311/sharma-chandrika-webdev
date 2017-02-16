/**
 * Created by chandrika2311 on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        console.log(vm.websites);

    }
})();