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
            var u = UserService.findUserByUsername(user.username);
            if (u)
                vm.error = "Username is not available";
            else {
                u = UserService.createUser(user);
                if(u){
                    vm.success = "User successfully registered";
                    $location.url("/user/"+u._id);
                }
                else
                    vm.error = "Failed to Register!!! Please try again";
            }
        }
    }

})();