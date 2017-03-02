/**
 * Created by chandrika2311 on 2/28/17.
 */
module.exports = function (app) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);
    app.post('/api/website/:websiteId/page', createPage);

    var pages = [
        {_id: "320", name: "Post 1", websiteId: "456", "description": "Lorem"},
        {_id: "320", name: "Post 2", websiteId: "456", "description": "Lorem"},
        {_id: "320", name: "Post 3", websiteId: "456", "description": "Lorem"},
        {_id: "320", name: "Post 1", websiteId: "567", "description": "Lorem"},
        {_id: "430", name: "Post 2", websiteId: "567", "description": "Lorem"},
        {_id: "540", name: "Post 3", websiteId: "567", "description": "Lorem"}
    ];

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;

        var web_pages = [];
        for(var p in pages) {

            if(pages[p].websiteId === wid) {
                web_pages.push(pages[p]);


            }
        }res.json(web_pages);

    }
    function deletePage(req, res) {
        var pid = req.params.pageId;
        for (var p in pages) {
            if (pages[p]._id === pid) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
    }
    function createPage(req,res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page._id = (new Date()).getTime().toString();
        page.websiteId = websiteId;
        pages.push(page);

        res.json(pages);

    }


    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;


        for(var p in pages){
            if(pages[p]._id === pageId){
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.json(pages);
                return;
            }
        }

    }
    function findPageById(req,res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                res.json(pages[p]);
                return;
            }
        }
    }
};