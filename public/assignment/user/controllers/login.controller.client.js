/**
 * Created by vyshaalnarayanam on 3/29/17.
 */

(function () {
    angular.module("WebAppMaker")
        .controller("LoginController",LoginController)

    function LoginController($location,UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            // console.log(user);
            if(user==null){
                vm.error = "Please enter valid username";
                return
            }
            if(user.password==null){
                vm.error = "Please enter valid password";
                return
            }
            var u = UserService.findUserByCredentials(user.username,user.password);
            if(u==null)
                vm.error = "User with the given credentials doesn't exist";
            else
                $location.url("/user/"+u._id);
        };
    }
})();