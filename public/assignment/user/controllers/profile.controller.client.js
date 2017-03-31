/**
 * Created by vyshaalnarayanam on 3/29/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("ProfileController",ProfileController)

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        vm.updateProfile = updateProfile;
        init();

        function init() {
            var promise = UserService.findUserById(userId)
            promise.then(function (response) {
                vm.user = response.data;
            });
        }

        function updateProfile(user) {
            UserService.updateUser(userId,user)
                .then (
                    function (response) {
                        vm.success = "Profile updated successfully";
                    },
                    function (response) {
                        vm.error = "Failed to update the profile";
                    });
        }
    }

})();