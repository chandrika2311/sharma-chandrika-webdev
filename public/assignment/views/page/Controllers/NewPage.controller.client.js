/**
 * Created by chandrika2311 on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageServices) {
        var vm = this;

        vm.createPage = createPage;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pages = PageServices.findAllPagesForWebsite(vm.websiteId);
        }
        init();

        function createPage (page){
            if (page!=null)
            {
                PageServices.createPage(vm.websiteId, page)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

                    });
            }

        }
    }
    }
)();