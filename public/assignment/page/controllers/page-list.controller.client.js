/**
 * Created by vyshaalnarayanam on 3/30/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("PageListController",PageListController);

    function PageListController($location,$routeParams,PageService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);

        init();
        function init() {
            PageService.findPageByWebsiteId(vm.wid)
                .then(function (response) {
                vm.pages = response.data;
            });
        }

    }
})();