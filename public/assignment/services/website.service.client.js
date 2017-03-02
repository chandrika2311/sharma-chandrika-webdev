
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var websites =
            [
                {_id: "123", name: "Facebook", developerId: "456", description: "Lorem"},
                {_id: "234", name: "Tweeter", developerId: "456", description: "Lorem"},
                {_id: "456", name: "Gizmodo", developerId: "456", description: "Lorem"},
                {_id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem"},
                {_id: "678", name: "Checkers", developerId: "123",description: "Lorem"},
                {_id: "789", name: "Chess", developerId: "234", description: "Lorem"}
            ];
        var api = {
            "websites": websites,
            "createWebsite": createWebsite,
            "findWebsitesByUser":findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website",website);

        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        function findWebsiteById(wid) {
            /**retrieves the website in local websites array whose _id matches the websiteId parameter**/
            return $http.get("/api/website/"+wid);

        }

        function updateWebsite(wid, website) {
            /**updates the website in local websites array whose _id matches the websiteId parameter**/
            return $http.put("/api/website/"+wid, website);
        }

        function deleteWebsite(wid) {
            /**removes the website from local websites array whose _id matches the websiteId parameter**/
            return $http.delete("/api/website/"+wid);
        }
    }

})();

