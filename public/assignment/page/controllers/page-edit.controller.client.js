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
            vm.page = PageService.findPageById(vm.pid);
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
        }

        function deletePage(pageId) {
            var flag = PageService.deletePage(pageId);
            if(flag){
                vm.success = "Page deleted successfully";
                $location.url('/user/'+vm.uid+'/website/'+vm.wid+'/page');
            }
            else
                vm.error = "Failed to delete the page";
        }

        function updatePage(pageId,page) {
            var temp = PageService.updatePage(pageId,page);
            if(temp){
                vm.websites = temp;
                $location.url('/user/'+vm.uid+'/website/'+vm.wid+'/page');
                vm.success = "Successfully updated the page";
            }
            else{
                vm.error = "Failed to update the page";
            }
        }


    }
})();