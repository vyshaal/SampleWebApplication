/**
 * Created by vyshaalnarayanam on 3/29/17.
 */

(function () {
    angular.module("WebAppMaker")
        .factory("UserService",UserService);
    
    function UserService() {
        var count = 1000;
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "dummy@mail.com"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "dummy@mail.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "dummy@mail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "dummy@mail.com" }
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        function createUser(user){
            user._id = count++;
            users.push(user);
            return user;
        }

        function findUserById(userId) {
            for(var u in users){
                user = users[u];
                if(user._id == userId)
                    return user;
            }
            return null;
        }

        function findUserByUsername(name) {
            for(var u in users){
                user = users[u];
                if(user.username == name)
                    return user;
            }
            return null;
        }

        function findUserByCredentials(username,password) {
            for(var u in users){
                user = users[u];
                if(user.username == username && user.password == password)
                    return user;
            }
            return null;
        }

        function updateUser(userId,user){
            for(var u in users){
                if(users[u]._id == userId){
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    users[u].email = user.email;
                    return users;
                }
            }
            return null
        }

        function deleteUser(userId){
            for(var u in users){
                if(users[u]._id==userId){
                    users.splice(u,1);
                    return true;
                }
            }
            return false;
        }

    }
    
})();