/**
 * Created by vyshaalnarayanam on 3/30/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("PageNewController",PageNewController);

    function PageNewController($routeParams,$location,PageService) {
        var vm = this;
        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);
        vm.createPage = createPage;

        init();
        function init() {
            PageService.findPageByWebsiteId(vm.wid)
                .then(function (response) {
                    vm.pages = response.data;
                });
        }

        function createPage(websiteId,page) {
            if(page==null){
                vm.error = "Page can't be created with empty details";
                return
            }
            PageService.createPage(websiteId,page)
                .then(function (response) {
                    vm.success = "Website created successfully!!!";
                    $location.url('/user/'+vm.uid+'/website/'+vm.wid+'/page');
                },
                function (response) {
                    vm.error = "Failed to create the page";
                });
        }
    }
})();