/**
 * Created by vyshaalnarayanam on 3/29/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("RegisterController",RegisterController)

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user == null){
                vm.error = "Please enter a valid username";
                return
            }
            if(user.password == null) {
                vm.error = "Please enter a valid password";
                return
            }
            if(user.verifypassword == null){
                vm.error = "Passwords doesn't match";
                return
            }

            var promise = UserService.findUserByUsername(user.username);
            promise.then(
                function (response) {
                    vm.error = "Username is not available";
                },
                function (response) {
                    UserService.createUser(user)
                        .then(
                            function (res) {
                                u = res.data;
                                if(u._id){
                                    vm.success = "User successfully registered";
                                    $location.url("/user/"+u._id);
                                }
                                else
                                    vm.error = "Failed to register";
                            });
                });

        }
    }

})();