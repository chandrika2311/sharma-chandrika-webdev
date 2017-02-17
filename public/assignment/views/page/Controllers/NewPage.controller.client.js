/**
 * Created by chandrika2311 on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageServices) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        function init() {
            vm.pages = PageServices.findPagesByWebsiteId(vm.websiteId);
        }
        init();

        function createPage (page){
            if (page!=null)
            {
                PageServices.createPage(vm.websiteId, page);
            }
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }
    }
)();