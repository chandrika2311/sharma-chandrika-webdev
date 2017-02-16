/**
 * Created by chandrika2311 on 2/14/17.
 */
/**
 * Created by chandrika2311 on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageServices) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pages = PageServices.findPagesByWebsiteId(vm.websiteId);


    }
})();