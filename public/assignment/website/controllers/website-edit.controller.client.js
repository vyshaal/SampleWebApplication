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
            WebsiteService.findWebsitesByUser(vm.uid)
                .then(function (response) {
                    vm.websites = response.data;
                });
            WebsiteService.findWebsiteById(vm.wid)
                .then(function (response) {
                    vm.website = response.data;
                });
            console.log(vm.website);
        }

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId)
                .then(
                    function (response) {
                        vm.success = "Website deleted successfully";
                        $location.url('/user/'+vm.uid+'/website');
                    },
                    function (response) {
                        vm.error = "Failed to delete the website";
                    });
        }

        function updateWebsite(websiteId,website) {
            WebsiteService.updateWebsite(websiteId,website)
                .then(
                    function (response) {
                        vm.websites = response.data;
                        $location.url('/user/'+vm.uid+'/website')
                        vm.success = "Successfully updated the website";
                    },
                    function (response) {
                        vm.error = "Failed to update the website";
                    });
        }


    }
})();