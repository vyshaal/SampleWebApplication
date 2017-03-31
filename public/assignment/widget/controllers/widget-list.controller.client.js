/**
 * Created by vyshaalnarayanam on 3/30/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("WidgetListController",WidgetListController);

    function WidgetListController($location,$routeParams,$sce,WidgetService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);
        vm.pid = parseInt($routeParams.pid);
        vm.wgid = parseInt($routeParams.wgid);
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;

        init();
        function init() {
            WidgetService.findWidgetsByPageId(vm.pid).then(function (response) {
                vm.widgets = response.data;
                jQuery(".container-fluid").sortable({axis:"y"});
            });
        }

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYoutubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length-1];
            var url = "https://youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();