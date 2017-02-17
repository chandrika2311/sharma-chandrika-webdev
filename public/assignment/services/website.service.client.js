
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
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
            /** adds the website parameter instance to the local websites array.
             *  The new website's developerId is set to the userId parameter**/
            website.developerId = userId;
            website._id = (new Date()).getTime().toString();


            websites.push(website);
        }

        function findWebsitesByUser(userId) {
            /**retrieves the websites in local websites array whose developerId matches the parameter userId**/
            var sites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function findWebsiteById(wid) {
            /**retrieves the website in local websites array whose _id matches the websiteId parameter**/

            for(var w in websites) {
                if(websites[w]._id === wid) {
                    return websites[w];
                }
            }
            return null;
        }

        function updateWebsite(wid, website) {
            /**updates the website in local websites array whose _id matches the websiteId parameter**/
            for(var w in websites) {
                if( websites[w].developerId === wid){
                    websites[w]._id = website._id;
                    websites[w].name = website.name;
                    websites[w].developerId = website.developerId;
                    websites[w].description = website.description;
                    return websites[w];
                }
            }return null;
        }

        function deleteWebsite(wid) {
            /**removes the website from local websites array whose _id matches the websiteId parameter**/
            for(var w in websites) {
                if(websites[w]._id === wid) {
                    websites.splice(w, 1);
                }
            }
        }
    }

})();

