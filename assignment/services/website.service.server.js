module.exports = function (app, WebsiteModel) {
    app.get('/api/user/:userId/website', findWebsitesByUser);
    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId',deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
    ];

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;

        WebsiteModel
            .findWebsitesByUser(userId)
            .then(function(websites) {

                res.send(websites);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
        }

    function createWebsite(req,res) {
        console.log("inside websites");
        var userId = req.params.userId;
        var website_new = req.body;

        WebsiteModel
            .createWebsite(userId, website_new)
            .then(function(website) {
                console.log(website);
                res.json(website);
            }, function (error) {
                console.log(error);
                res.sendStatus(400).send(error);
            });
    }
    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        WebsiteModel
            .findWebsiteById(wid)
            .then(function(website) {
                res.json(website);
            }, function (error) {
                console.log(error);
                res.sendStatus(400).send(error);
            });
    }
    function updateWebsite(req, res) {
        var wid = req.params.websiteId;
        var website = req.body;
        WebsiteModel
            .updateWebsite(wid, website)
            .then(function(website) {
                res.json(website);
            }, function (error) {
                console.log(error);
                res.sendStatus(400).send(error);
            });

    }
    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        WebsiteModel
            .deleteWebsite(websiteId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    console.log('success delete')
                    res.sendStatus(200);
                }
                else{
                    console.log('fail delete');
                    res.sendStatus(404);
                }
            }, function (err) {
                console.log(err);
                res.sendStatus(404);
            });
    }
};