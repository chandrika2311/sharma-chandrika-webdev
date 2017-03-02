/**
 * Created by chandrika2311 on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;


        function init() {
            WebsiteService.
            findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;

                });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                })
        }

        init();

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }

        function updateWebsite() {
            WebsiteService
                .updateWebsite(vm.websiteId, vm.website)
                .success(function (website) {
                    $location.url("/user/"+vm.userId+"/website");
                });
        }
    }
})();