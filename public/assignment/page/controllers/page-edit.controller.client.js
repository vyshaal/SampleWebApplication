/**
 * Created by vyshaalnarayanam on 3/30/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("PageEditController",PageEditController);

    function PageEditController($routeParams,$location,PageService) {
        var vm = this;
        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);
        vm.pid = parseInt($routeParams['pid']);
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        init();
        function init() {
            PageService.findPageById(vm.pid)
                .then(function (response) {
                    vm.page = response.data;
                });
            PageService.findPageByWebsiteId(vm.wid)
                .then(function (response) {
                    vm.pages = response.data;
                });
        }

        function deletePage(pageId) {
            PageService.deletePage(pageId)
                .then(
                    function (response) {
                        vm.success = "Page deleted successfully";
                        $location.url('/user/'+vm.uid+'/website/'+vm.wid+'/page');
                    },
                    function (response) {
                        vm.error = "Failed to delete the page";
                    });
        }

        function updatePage(pageId,page) {
            PageService.updatePage(pageId,page)
                .then(function (response) {
                    $location.url('/user/'+vm.uid+'/website/'+vm.wid+'/page');
                    vm.success = "Successfully updated the page";
                },
                function (response) {
                    vm.error = "Failed to update the page";
                });
        }

    }
})();