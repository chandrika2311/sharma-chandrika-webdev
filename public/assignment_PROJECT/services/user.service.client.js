/**
 * Created by chandrika2311 on 4/15/17.
 */
(function () {
    angular
        .module("MentorStudentApp")
        .factory("UserService",UserService);

    function UserService($http) { //helps in creation interaction with any server.

        var api = {
            "logout": logout,
            "spliceProjectFromUser": spliceProjectFromUser,
            "login":login,
            "register": register,
            "createUser": createUser,
            "getAllUsers":getAllUsers,
            "findCourseForUser": findCourseForUser,
            "findUserById": findUserById,
            "findAllMentors":findAllMentors,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "findUserByCredentials": findUserByCredentials
        };
        return api;
        /** this API object has attributes if MentorService instance is used it will return the object of api.
         this api object is bound with local function**/
        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout(user) {
            return $http.post("/api/logout");
        }
        function spliceProjectFromUser(userId,project) {
            return $http.post("/api/splice/project/"+userId,project);

        }

        function register(user) {
            console.log('creating user', user.role);
            return $http.post("/api/register",user);
        }

        function createUser(user) {
            return $http.post("/api/student", user);
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
            return $http.put("/api/user/"+userId,newUser);
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function findCourseForUser(userId) {
            return $http.get('/api/user/'+userId);
        }
        function findAllMentors() {
            return $http.get("/api/getmentors");

        }
        function getAllUsers() {
            return $http.get("/api/allUsers");

        }
    }
})();