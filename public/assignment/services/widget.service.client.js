
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);
    function WidgetService($http) {
        var api = {

            "findAllWidgetsForPage": findAllWidgetsForPage,
            "createWidgets": createWidgets,
            "findWidgetsById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidgets(pageId,widget) {
            return $http.post("/api/page/"+pageId+"/widget", widget);
        }
        function findAllWidgetsForPage(pageId){
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId,widget);
        }
        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }
        function deleteWidget(widgetId) {
            return $http.delete('/api/widget/'+widgetId);
        }
    }})();