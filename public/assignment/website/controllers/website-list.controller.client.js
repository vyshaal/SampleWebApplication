/**
 * Created by vyshaalnarayanam on 3/29/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController);

    function WebsiteListController($routeParams,WebsiteService) {
        var vm = this;
        vm.uid = parseInt($routeParams['uid']);
        init();
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }
    }
})();