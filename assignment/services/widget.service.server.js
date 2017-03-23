/**
 * Created by chandrika2311 on 3/1/17.
 */
module.exports = function (app, WidgetModel) {
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.put("/page/:pid/widget", sortWidget);
    app.delete('/api/widget/:widgetId',deleteWidget);

    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    var widgets =
        [
            { _id: "123", widgetType: "HEADER", pageId: "320", size: 2, text: "GIZMODO"},
            { _id: "234", widgetType: "HEADER", pageId: "320", size: 4, text: "Lorem ipsum"},
            { _id: "345", widgetType: "IMAGE", pageId: "320", width: "100%", url: "http://lorempixel.com/400/200/"},
            //{ _id: "456", widgetType: "HTML", pageId: "320", text: "Lorem ipsum"},
            { _id: "567", widgetType: "HEADER", pageId: "320", size: 4, text: "Lorem ipsum"},
            { _id: "678", widgetType: "YOUTUBE", pageId: "320", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E" },
            //{ _id: "789", widgetType: "HTML", pageId: "321", text: "Lorem ipsum"}
        ];

    function createWidget(req,res) {
        var pageId= req.params.pageId;
        var widget = req.body;

        WidgetModel
            .createWidget(pageId, widget)
            .then(function(widget) {
                console.log('in website service create');
                console.log(widget);
                res.send(widget);
            }, function (error) {
                console.log(error);
                res.sendStatus(400).send(error);
            });


    }

    function findWidgetById(req,res) {
        var widgetId = req.params['widgetId'];
        WidgetModel
            .findWidgetById(widgetId)
            .then(function(widget) {

                res.send(widget);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }
    function updateWidget(req,res) {

        var widgetId=req.params['widgetId'];
        var widget=req.body;
        WidgetModel.updateWidget(widgetId, widget)
            .then(function(widget) {
                res.send(widget);
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }
    function findAllWidgetsForPage(req,res){
        var pageId = req.params.pageId;
        WidgetModel
            .findAllWidgetsForPage(pageId)
            .then(function(widgets) {
                console.log('in website service find all');
                res.send(widgets);
            }, function (error) {
                res.sendStatus(400).send(error);
            });

    }
    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var imgWidget ={
            width:width,
            _id:widgetId
        }
        if(req.file!=null) {
            var myFile = req.file;
            var destination = myFile.destination;


            imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

            WidgetModel
                .updateWidget(widgetId, imgWidget)
                .then(function (response) {
                    if(response.ok===1&&response.n===1){

                        console.log("in hereeeee1");
                        WidgetModel
                            .findWidgetById(widgetId)
                            .then(function (newResponse) {
                                console.log("in hereeeee2");
                                pageId = newResponse._page;
                                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");

                            });
                    }
                    else{
                        res.sendStatus(404);
                    }
                },function(err){
                    res.sendStatus(404);
                });

        }
        else{
            pageId = req.body.pageId;
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId);
        }


    }

    function deleteUploadedImage(imageUrl) {
        // Local helper function
        if(imageUrl && imageUrl.search('http') == -1){
            // Locally uploaded image
            // Delete it
            fs.unlink(publicDirectory+imageUrl, function (err) {
                if(err){
                    console.log(err);
                    return;
                }
                console.log('successfully deleted '+publicDirectory+imageUrl);
            });
        }
    }
    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        WidgetModel
            .deleteWidget(widgetId)
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function sortWidget(req, res) {
        var pid = req.params.pid;
        var index1 = parseInt(req.query.initial);
        var index2 = parseInt(req.query.final);

        WidgetModel
            .sortWidget(index1, index2, pid)
            .then(function() {
                console.log('success');
                res.sendStatus(200);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }


};