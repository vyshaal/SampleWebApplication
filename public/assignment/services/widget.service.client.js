/**
 * Created by vyshaalnarayanam on 3/29/17.
 */

(function () {
    angular.module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService() {
        var count = 1000;
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        return api;

        function createWidget(pageId,widget){
            widget._id = count++;
            widget.pageId = pageId;
            widgets.push(widget);
            console.log(widget._id);
            return widget;
        }

        function findWidgetsByPageId(pageId) {
            var result = [];
            for(var wg in widgets){
                if(widgets[wg].pageId==pageId)
                    result.push(widgets[wg]);
            }
            return result;
        }
        
        function findWidgetById(widgetId) {
            for(var wg in widgets){
                if(widgets[wg]._id==widgetId)
                    return widgets[wg];
            }
            return null;
        }

        function updateWidget(widgetId,widget) {
            for(var wg in widgets){
                if(widgets[wg]._id==widgetId){
                    widgets[wg] = widget;
                    return widgets;
                }
            }
            return null;
        }
        function deleteWidget(widgetId){
            for(var wg in widgets){
                if(widgets[wg]._id==widgetId){
                    widgets.splice(wg,1);
                    return true;
                }
            }
            return false;
        }
    }
})();