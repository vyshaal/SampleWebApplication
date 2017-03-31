/**
 * Created by vyshaalnarayanam on 3/30/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);
    
    function WidgetNewController($routeParams,$location,WidgetService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);
        vm.pid = parseInt($routeParams.pid);
        vm.addWidget = createWidget;

        init();
        function init() {
        }

        function createWidget(widgetType) {
            var widget = {};
            widget.widgetType = widgetType;
            WidgetService.createWidget(vm.pid,widget)
                .then(function (response) {
                    var w = response.data;
                    var url = '/user/'+vm.uid+'/website/'+vm.wid+'/page/'+vm.pid+'/widget/'+w._id;
                    console.log(url);
                    $location.url(url);
                });
        }
    }
})();