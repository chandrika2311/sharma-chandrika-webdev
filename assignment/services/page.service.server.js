/**
 * Created by chandrika2311 on 2/28/17.
 */
module.exports = function (app, PageModel) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);
    app.post('/api/website/:websiteId/page', createPage);



    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;

        PageModel
            .findAllPagesForWebsite(wid)
            .then(function(pages) {
                console.log(pages);
                res.json(pages);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        PageModel
            .deletePage(pageId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function createPage(req,res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        PageModel
            .createPage(websiteId, page)
            .then(function(page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(400).send(error);
            });

    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        PageModel
            .updatePage(pageId, page)
            .then(function(page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(400).send(error);
            });

    }
    function findPageById(req,res) {
        var pageId = req.params.pageId;
        PageModel
            .findPageById(pageId)
            .then(function(page) {

                res.json(page[0]);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }
};