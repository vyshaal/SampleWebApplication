/**
 * Created by vyshaalnarayanam on 3/31/17.
 */

module.exports = function (app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "dummy@mail.com"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "dummy@mail.com"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "dummy@mail.com"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "dummy@mail.com" }
    ];

    var count = 1000;

    app.get('/api/user',getUsers);
    app.get('/api/user/:userId',findUserById);
    app.post('/api/user',createUser);
    app.put('/api/user/:userId',updateUser);
    app.delete('/api/user/:userId',deleteUser);

    function createUser(req,res) {
        var user = req.body;
        user._id = count++;
        users.push(user);
        res.send(user);
    }

    function updateUser(req,res){
        var user = req.body;
        user._id = req.params.userId;
        for(var u in users){
            if(users[u]._id==user._id){
                users[u] = user;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteUser(req,res){
        var id = req.userId;
        for(var u in users){
            if(users[u]._id==id){
                users.splice(u,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function getUsers(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username&&password){
            findUserByCredentials(username,password,res);
        }
        else if(username){
            findUserByUsername(username,res);
        }
        else{
            res.send(users);
        }
    }

    function findUserById(req,res) {
        var userId = req.params.userId;
        for(var u in users){
            if(users[u]._id==userId){
                res.send(users[u]);
                return
            }
        }
        res.send({});
    }

    function findUserByCredentials(username,password,res){
        for(var u in users){
            if(users[u].username==username&&users[u].password==password){
                res.send(users[u]);
                return
            }
        }
        res.send({})
    }

    function findUserByUsername(username,res) {
        for(var u in users){
            if(users[u].username==username){
                res.sendStatus(200);
                return
            }
        }
        res.sendStatus(400);
    }


}