/**
 * Created by chandrika2311 on 2/14/17.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageServices", PageServices);

    function PageServices() {
        var pages = [
            {_id: "321", name: "Post 1", websiteId: "456", "description": "Lorem"},
            {_id: "432", name: "Post 2", websiteId: "456", "description": "Lorem"},
            {_id: "543", name: "Post 3", websiteId: "456", "description": "Lorem"},
            {_id: "320", name: "Post 1", websiteId: "567", "description": "Lorem"},
            {_id: "430", name: "Post 2", websiteId: "567", "description": "Lorem"},
            {_id: "540", name: "Post 3", websiteId: "567", "description": "Lorem"},
        ];
        var api = {
            "pages" : pages,
            "createPage":createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;
        function createPage(websiteId, page) {
            page._id = (new Date()).getTime().toString();
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId) {
            var sites =[];
            for(var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    sites.push(pages[p]);
                }
            }return sites;
        }



        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }
        function updatePage(pageId,page) {
            for(var p in pages){
                var page_var=pages[p];
                if(page_var._id === pageId){
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return page_var;
                }
            }
            return null;
        }


        function deletePage(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages.splice(p, 1);
                }
            }
        }}
    })();

