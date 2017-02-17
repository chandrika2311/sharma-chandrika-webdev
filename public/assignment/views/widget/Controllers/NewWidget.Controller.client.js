/**
 * Created by chandrika2311 on 2/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.widgetId = $routeParams.wgid;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createWid = createWid;


        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }init();


        function createWid(widgetType) {
            newWidget = {};
            newWidget.pageId = vm.pageId;
            newWidget.widgetType = widgetType;
            newWidget._id = (new Date()).getTime().toString();
            switch (widgetType) {
                case "heading":
                    newWidget.text = "CAT & DOG <3 <3";
                    newWidget.size = 3;
                    break;
                case "image":
                    newWidget.url = "https://image.shutterstock.com/z/stock-photo-blue-eyed-cat-259729697.jpg";
                    newWidget.width = "100%";
                    break;
                case "youtube":
                    newWidget.url = "https://www.youtube.com/watch?v=wj3BILPQoCo";
                    newWidget.width = "100%";
                    break;
                case "html":
                    newWidget.text = "Hello Cat Hello Dog";
                    break;
            }
            WidgetService.createWidgets(vm.pageId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }})();