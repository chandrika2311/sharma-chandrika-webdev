/**
 * Created by chandrika2311 on 2/14/17.

(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetServices", WidgetServices);

    function WidgetServices() {
        var widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ]

        var api = {
            "pages": pages,
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {

        }
        function findWidgetsByPageId(pageId) {

        }
        function findWidgetById(widgetId) {

        }
        function updateWidget(widgetId, widget) {

        }
        function deleteWidget(widgetId) {

        }
    /**createWidget(pageId, widget) - adds the widget parameter instance to the local widgets array. The new widget's pageId is set to the pageId parameter
     findWidgetsByPageId(pageId) - retrieves the widgets in local widgets array whose pageId matches the parameter pageId
     findWidgetById(widgetId) - retrieves the widget in local widgets array whose _id matches the widgetId parameter
     updateWidget(widgetId, widget) - updates the widget in local widgets array whose _id matches the widgetId parameter
     deleteWidget(widgetId) - removes the widget from local widgets array whose _id matches the widgetId parameter**/

    (function () {
        angular
            .module("WebAppMaker")
            .service("WidgetService", WidgetService);
    function WidgetService() {
        var widgets =
            [
                { _id: "123", widgetType: "HEADING", pageId: "320", size: 2, text: "GIZMODO"},
                { _id: "234", widgetType: "HEADING", pageId: "320", size: 4, text: "Lorem ipsum"},
                { _id: "345", widgetType: "IMAGE", pageId: "320", width: "100%", url: "http://lorempixel.com/400/200/"},
                { _id: "456", widgetType: "HTML", pageId: "320", text: "Lorem ipsum"},
                { _id: "567", widgetType: "HEADING", pageId: "320", size: 4, text: "Lorem ipsum"},
                { _id: "678", widgetType: "YOUTUBE", pageId: "320", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E" },
                { _id: "789", widgetType: "HTML", pageId: "321", text: "Lorem ipsum"}
            ];
        var api = {
            "widgets": widgets,

            "findWidgetsByPageId": findWidgetsByPageId,
            "createWidgets": createWidgets,
            "findWidgetsById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;
        function findWidgetsByPageId(pageId){
            var widg = [];
            for(var w in widgets) {
                if(widgets[w].pageId == pageId){
                    widg.push(widgets[w]);
                }
            }return widg;
        }
        function createWidgets(pageId,widget) {
                 var newwidget ={
                     _id :  (new Date()).getTime().toString(),
                     pageId: pageId
                 }; widgets.push(newwidget);
             }



        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if( widgets[w]._id == widgetId){
                    widgets[w].widgetType = widget.widgetType;
                    widgets[w].pageId = widget.pageId;
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;
                    return widgets[w];
                }
            }return null;
            
        }


        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._Id == widgetId){
                    return widgets[w];
                }

            }return null;
        }
        function deleteWidget(widgetId) {
            for (var w in widgets) {
                if (widgets[p]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }

        }
    }})();