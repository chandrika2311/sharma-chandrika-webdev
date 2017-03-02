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

            vm.pageId = $routeParams.pid;
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;


        }init();


        function createWid(widgetType) {
            console.log(widgetType);
            newWidget = {};
            newWidget.pageId = vm.pageId;
            newWidget.widgetType = widgetType.toString();
            newWidget._id = (new Date()).getTime().toString();
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
                    newWidget.width = "100%";
                    break;
                // case "HTML":
                //     newWidget.text = "<p>Hello Cat Hello Dog<p>";
                //     break;
            }
            console.log(newWidget);
            WidgetService
                .createWidgets(vm.pageId, newWidget)
                .success(function (widget) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
                });

        }
    }})();