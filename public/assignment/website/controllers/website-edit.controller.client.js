/**
 * Created by vyshaalnarayanam on 3/29/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("WebsiteEditController",WebsiteEditController);

    function WebsiteEditController($routeParams,$location,WebsiteService) {
        var vm = this;
        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        init();
        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.wid);
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }

        function deleteWebsite(websiteId) {
            var flag = WebsiteService.deleteWebsite(websiteId);
            if(flag){
                vm.success = "Website deleted successfully";
                $location.url('/user/'+vm.uid+'/website');
            }
            else
                vm.error = "Failed to delete the website";
        }

        function updateWebsite(websiteId,website) {
            var temp = WebsiteService.updateWebsite(websiteId,website);
            if(temp){
                vm.websites = temp;
                $location.url('/user/'+vm.uid+'/website')
                vm.success = "Successfully updated the website";
            }
            else{
                vm.error = "Failed to update the website";
            }
        }


    }
})();