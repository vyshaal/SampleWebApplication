/**
 * Created by vyshaalnarayanam on 3/29/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("WebsiteNewController",WebsiteNewController);

    function WebsiteNewController($routeParams,$location,WebsiteService) {
        var vm = this;
        vm.uid = parseInt($routeParams['uid']);
        vm.createWebsite = createWebsite;

        init();
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }

        function createWebsite(userId,website) {
            var w = WebsiteService.createWebsite(userId,website);
            if(w){
                $location.url('/user/'+userId+'/website');
                vm.success = "Website created successfully!!!";
            }
            else{
                vm.error = "Failed to create the website";
            }
        }
    }
})();