/**
 * Created by chandrika2311 on 2/14/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;

        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;


        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;

            WidgetService.findWidgetsById(vm.widgetId)
                .success(function (widget) {
                    vm.widget=widget;
                });
            WidgetService.findAllWidgetsForPage(vm.pageId)
                .success(function (widget) {
                    vm.widgets=widget;
                });
        }
        init();

        function updateWidget() {
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }
        function getEditorTemplateUrl(type) {
            var url="views/widget/editors/widget-"+type+"-editor.view.client.html";
            return url;
        }
        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }
    }
})();