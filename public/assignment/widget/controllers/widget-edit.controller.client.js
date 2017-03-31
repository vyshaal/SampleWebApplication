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
            WidgetService.findWidgetById(vm.wgid)
                .then(function (response) {
                    vm.widget = response.data;
                })
        }

        function updateWidget(widgetId,widget) {
            WidgetService.updateWidget(widgetId, widget)
                .then(function (response) {
                        vm.success = "Widget updated successfully";
                        $location.url('user/' + vm.uid + '/website/' + vm.wid + '/page/' + vm.pid + '/widget');
                    },
                    function (response) {
                        vm.error = "Failed to update the widget";
                    });
        }

        function deleteWidget(widgetId) {
            WidgetService.deleteWidget(widgetId)
                .then(function (response) {
                    vm.success = "Successfully deleted the widget";
                    $location.url('/user/'+vm.uid+'/website/'+vm.wid+'/page/'+vm.pid+'/widget');
                },function (response) {
                    vm.error = "Failed to delete the widget";
                });
        }

    }
})();