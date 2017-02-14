/**
 * Created by chandrika2311 on 2/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService );

    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ]
        var api = {
            "users": users,
            "findUserByCredentials": findUserByCredentials()
        };
        return api;
        /** this API object has attributes if userservice instance is used it will return the object of api.
         this api object is bound with local function**/
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
    }
})();