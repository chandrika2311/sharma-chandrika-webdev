/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageServices) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage = updatePage();


        function init() {
            vm.page = PageServices.findPageById(vm.pageId);
            vm.pages = PageServices.findPagesByWebsiteId(vm.websiteId);

        }
        init();

        function deletePage() {
            PageServices.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website"+vm.websiteId+"/page");
        };
        function updatePage() {
            PageService.updatePage(vm.pageId,vm.page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };
    }
})();