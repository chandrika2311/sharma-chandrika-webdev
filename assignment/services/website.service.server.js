module.exports = function (app) {
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
        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
        }

    function createWebsite(req,res) {
        var userId = req.params.userId;
        var website_new = req.body;

        website_new.developerId = userId;
        website_new._id = (new Date()).getTime().toString();
        websites.push(website_new);
        res.json(websites);
    }
    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                res.json(websites[w]);
                return;
            }
        }
    }
    function updateWebsite(req, res) {
        var wid = req.params.websiteId;
        var website = req.body;
        for(var w in websites) {
            if( websites[w]._id === wid){
                websites[w]._id = website._id;
                websites[w].name = website.name;
                websites[w].developerId = website.developerId;
                websites[w].description = website.description;
            }
        }
        res.json(websites);
    }
    function deleteWebsite(req,res) {
        wid = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
    }
};