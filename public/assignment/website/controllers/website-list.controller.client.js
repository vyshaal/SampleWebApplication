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
            var promise = WebsiteService.findWebsitesByUser(vm.uid);
            promise.then(function (response) {
                vm.websites = response.data;
            });
        }
    }
})();