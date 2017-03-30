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
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
        }

        function createPage(websiteId,page) {
            if(page==null){
                vm.error = "Page can't be created with empty details";
                return
            }
            var p = PageService.createPage(websiteId,page);
            if(p){
                vm.success = "Website created successfully!!!";
                $location.url('/user/'+vm.uid+'/website/'+vm.wid+'/page');
            }
            else{
                vm.error = "Failed to create the page";
            }
        }
    }
})();