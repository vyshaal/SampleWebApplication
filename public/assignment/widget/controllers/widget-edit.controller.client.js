/**
 * Created by vyshaalnarayanam on 3/30/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams,$location,WidgetService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);
        vm.pid = parseInt($routeParams.pid);
        vm.wgid = parseInt($routeParams.wgid);
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        init();
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }

        function updateWidget(widgetId,widget) {
            var w = WidgetService.updateWidget(widgetId,widget);
            if(w){
                vm.widgets = w;
                vm.success = "Widget updated successfully";
                $location.url('user/'+vm.uid+'/website/'+vm.wid+'/page/'+vm.pid+'/widget');
            }
            else{
                vm.error = "Failed to update the widget";
            }
        }

        function deleteWidget(widgetId) {
            var flag = WidgetService.deleteWidget(widgetId);
            if(flag){
                vm.success = "Successfully deleted the widget";
                $location.url('/user/'+vm.uid+'/website/'+vm.wid+'/page/'+vm.pid+'/widget');
            }
            else {
                vm.error = "Failed to delete the widget";
            }
        }

    }
})();