/**
 * Created by chandrika2311 on 2/14/17.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageServices) {

        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;

            PageServices
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;

                });
            vm.pages = PageServices.findAllPagesForWebsite(vm.websiteId);

        }
        init();

        function deletePage() {
            PageServices
                .deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });

        };
        function updatePage() {
            PageServices
                .updatePage(vm.pageId,vm.page)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });

        };
    }
})();