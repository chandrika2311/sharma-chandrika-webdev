/**
 * Created by chandrika2311 on 2/14/17.
 */

(function ($http) {
    angular
        .module("WebAppMaker")
        .factory("PageServices", PageServices);

    function PageServices($http) {

        var api = {
            "createPage":createPage,
            "findAllPagesForWebsite": findAllPagesForWebsite,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function findAllPagesForWebsite(websiteId) {

            return $http.get("/api/website/"+websiteId+"/page");
        }
        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId);
        }
        function updatePage(pageId,page) {
            return $http.put("/api/page/"+pageId, page);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
        }
        function createPage(websiteId, page) {
            return $http.post("/api/website/"+websiteId+"/page", page);
        }
    }
    })();

