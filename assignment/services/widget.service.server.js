/**
 * Created by chandrika2311 on 3/1/17.
 */
module.exports = function (app) {
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
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
        var widget_new = req.body;
        var pageId= req.params.pageId;
        widget_new.pageId=pageId;

        console.log(widget_new);
        widgets.push(widget_new);
        res.json(widget_new);


    }
    function deleteWidget(req,res) {
        var widgetId=req.params['widgetId'];
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
            }
        }
    }
    function findWidgetById(req,res) {
        var widgetId = req.params['widgetId'];
        var widget_list=[];
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
    }
    function updateWidget(req,res) {

        var widgetId=req.params['widgetId'];
        var widget=req.body;
        for(var w in widgets){
            var widget_var=widgets[w];
            if(widget_var._id === widgetId){
                widgets[w].widgetType = widget.widgetType;
                widgets[w].size = widget.size;
                widgets[w].text = widget.text;

                res.send(widgets[w]);
                return;
            }
        }
    }
    function findAllWidgetsForPage(req,res){
        var pageId = req.params.pageId;

        var widg = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId){
                widg.push(widgets[w]);
            }
        }

        res.json(widg);
    }
    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        if (req.file != null) {
            var myFile = req.file;
            var destination = myFile.destination; // folder where file is saved to

            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].width = width;
                    widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

                    pageId = widgets[i].pageId;
                }
            }

            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
        }}
};