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
            var promise = WebsiteService.findWebsitesByUser(vm.uid);
            promise.then(function (response) {
                vm.websites = response.data;
            });
        }

        function createWebsite(userId,website) {
            var promise = WebsiteService.createWebsite(userId,website);
            promise.then(function(response) {
                var w = response.data;
                if(w._id){
                    $location.url('/user/'+userId+'/website');
                    vm.success = "Website created successfully!!!";
                }else{
                    vm.error = "Failed to create the website";
                }
            });
        }
    }
})();