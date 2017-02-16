
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService );

    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email : "alica@gmail.com"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email : "bob@gmail.com"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email :"charly@gmail.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email : "jann@gmail.com"}
        ]
        var api = {
            "users": users,
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "findUserByCredentials": findUserByCredentials
        };
        return api;
        /** this API object has attributes if userservice instance is used it will return the object of api.
         this api object is bound with local function**/

        function createUser(user) {
            if (findUserByUsername(user.username) == null)
            {

                user._id = (new Date()).getTime().toString();
                    users.push(user);
                return angular.copy(user.username);
            }
            return null;
        }

        function findUserByUsername(username){
            for (var u in users){
                var user = users[u];
                if (user.username === username)
                {
                    return angular.copy(user);
                }
            } return null;
        }
        function findUserById(userId){
            for (var u in users) {
                var user = users[u];
                if (user._id === userId) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username &&
                    user.password === password) {
                    return angular.copy(user);
                }

            }
            return null;
        }
        function updateUser(userId, user) {
            for (var u in users) {
                var old_user = users[u];
                if (old_user._id === userId)
                {
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    users[u].username = user.username;
                    users[u].password = user.password;

                    return angular.copy(user);
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for (var u in users) {
                var old_user = users[u];
                if (old_user._id === userId)
                {
                    users.pop(users[u]);
                    return angular.copy(old_user);
                }
            }
            return null;
        }
    }
})();