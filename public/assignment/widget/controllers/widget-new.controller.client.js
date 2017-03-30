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
            var w = WidgetService.createWidget(vm.pid,widget);
            console.log(w);
            $location.url('/user/'+vm.uid+'/website/'+vm.wid+'/page/'+vm.pid+'/widget/'+w._id);
        }
    }
})();