
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService );

    function UserService($http) { //helps in creation interaction with any server.

        var api = {

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
                return $http.post("/api/user", user);


        }
        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }
        function findUserById(userId){
            return $http.get("/api/user/"+userId)

        }

        function findUserByCredentials(username, password){
           return $http.get("/api/user?username="+username+"&password="+password);


        }

        function updateUser(userId, newUser) {
            console.log('at UpdateUser');
            console.log(userId);
            return $http.put("/api/user/"+userId,newUser);
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }
    }
})();