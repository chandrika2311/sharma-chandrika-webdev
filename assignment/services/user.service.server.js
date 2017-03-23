/**
 * Created by chandrika2311 on 2/28/17.
 */

module.exports = function (app, UserModel) {
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

    function createUser(req,res){

        var newUser = req.body;
        console.log(newUser);
        var newUser1 = {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        };
        UserModel
            .createUser(newUser1)
            .then(function(user) {

                res.send(user);
            }, function (error) {
                res.sendStatus(400).send(error);
            });

    }
    function findUserByUserId( req, res){
        var userId = req.params['userId'];
        console.log('in userId');
        console.log(userId);
        UserModel
            .findUserById(userId)
            .then(function(user) {

                res.send(user);
            }, function (error) {
                res.sendStatus(400).send(error);
            });

    }
    function findUserByCredentials( req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        UserModel
            .findUserByCredentials(username, password)
            .then(function(user) {
                console.log('user found in credentials');
                console.log(user);
                res.json(user[0]);
            }, function (error) {
                res.sendStatus(400).send(error);
            });

    }


    function updateUser( req, res) {
        var userId = req.params['userId'];
        var olduser = req.body;
        UserModel
            .updateUser(userId, olduser)
            .then(function(user) {
                res.send(user);
            }, function (error) {
                res.sendStatus(400).send(error);
            });


    }
    function findUserByUsername(req, res) {
        var username = req.query['username'];
        console.log('in username');

        UserModel
            .findUserByUsername(username)
            .success(function(user) {
                res.send(user);
            });
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

    function deleteUser(req, res) {
        var userId = req.params.userId;
        UserModel
            .deleteUser(userId)
            .then(function (response) {
                console.log('sucess delete user');
                res.sendStatus(200);
            },function (err) {
                console.log('fail delete user');
                res.sendStatus(404);
            });
    }

};
