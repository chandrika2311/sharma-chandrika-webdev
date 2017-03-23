/**
 * Created by chandrika2311 on 2/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController(WidgetService, $routeParams, $location) {
        var vm = this;

        vm.createWid = createWid;


        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];


        }init();

        function createWid(widgetType) {
            newWidget = {};
            newWidget.pageId = vm.pageId;
            newWidget.widgetType = widgetType.toString();
            switch (widgetType) {
                case "HEADER":
                    newWidget.name = "Cat and Dog";
                    newWidget.text = "CAT & DOG <3 <3";
                    newWidget.size = 3;
                    break;
                case "IMAGE":
                    newWidget.name = "Cat and Dog";
                    newWidget.text = "hello";
                    newWidget.url = "https://image.shutterstock.com/z/stock-photo-blue-eyed-cat-259729697.jpg";
                    newWidget.width = "100%";
                    break;
                case "YOUTUBE":
                    newWidget.name = "hello_youtube";
                    newWidget.text = "hello_youtube";
                    newWidget.url = "https://www.youtube.com/watch?v=wj3BILPQoCo";

                    break;
                 case "HTML":
                     newWidget.text = "Hello Cat Hello Dog";
                     break;
            }
            console.log(newWidget);
            WidgetService
                .createWidgets(vm.pageId, newWidget)
                .success(function (widget) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
                });

        }
    }})();