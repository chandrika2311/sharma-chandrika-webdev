/**
 * Created by chandrika2311 on 2/28/17.
 */

module.exports = function (app) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.get("/api/user/:userId", findUserByUsername);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstname: "Alice", lastname: "Wonder", email : "alica@gmail.com"},
        {_id: "234", username: "bob", password: "bob", firstname: "Bob", lastname: "Marley", email : "bob@gmail.com"},
        {_id: "345", username: "charly", password: "charly", firstname: "Charly", lastname: "Garcia", email :"charly@gmail.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstname: "Jose", lastname: "Annunzi", email : "jann@gmail.com"}
    ];
    function findUserByCredentials( req, res) {
        var username = req.query['username'];

        var password = req.query['password'];
        var user = users.find(function(u){
            return u.username == username && u.password == password;
        });
        if (user){
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    }

    function findUserByUserId( req, res){
        var userId = req.params['userId'];
        for (var u in users) {
            var user = users[u];
            if (user._id === userId) {
                res.send(user);
                return;
            }
        }
        res.sendStatus(404);
        return null;
    }
    function updateUser( req, res) {
        var userId = req.params['userId'];

        for (var u in users) {
            var user = users[u];
            if (user._id === userId)
            {   console.log('found user');
                console.log(user);
                console.log('new user');
                var newUser = req.body;
                console.log(newUser);
                users[u].firstname = newUser.firstname;
                users[u].lastname = newUser.lastname;
                users[u].username = newUser.username;
                users[u].password = newUser.password;
                users[u].email = newUser.email;
                res.sendStatus(200);
                return;

            }
        }
        res.sendStatus(404);
    }
    function findUserByUsername(req, res) {
        var username = req.query['username'];

        var user = users.find(function(u){
            return u.username == username;
        });
        if (user){
            console.log(user);
            res.send(user);
        }else{
            res.sendStatus(404);
        }

    }
    function findUser(req,res) {
        var username= req.query['username'];
        var password= req.query['password'];
        if (username && password){
            findUserByCredentials(req,res);
        }else if (username){
            findUserByUsername(req,res);
        }

    }
    function createUser(req,res){
        var newUser = req.body;

        newUser._id = (new Date()).getTime().toString();
        users.push(newUser);
        res.json(newUser);

    }
    function deleteUser(req, res) {
        var userId = req.params.userId;
        for(var u in users) {
            if(users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};
