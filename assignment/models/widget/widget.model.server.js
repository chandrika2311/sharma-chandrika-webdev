/**
 * Created by chandrika2311 on 3/22/17.
 */


var model = null;
var mongoose = require('mongoose');
var WidgetSchema = require('./widget.schema.server');
var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);


WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.createWidget = createWidget;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.setModel = setModel;
WidgetModel.uploadImage = uploadImage;
WidgetModel.deleteWidgetOfPage = deleteWidgetOfPage;
WidgetModel.deleteUploadedImage = deleteUploadedImage;
WidgetModel.sortWidget = sortWidget;


function setModel(_model) {
    model = _model;
}
function findAllWidgetsForPage(pageId) {
    return WidgetModel.find({_page: pageId});
}
function createWidget(pageId, new_widget) {
    console.log(new_widget);
    return WidgetModel
        .create(new_widget)
        .then(
            function(widget){
                console.log('inside widget create');
                return model.PageModel.findOne({_id: pageId})
                    .then(function (page) {
                        console.log('inside widget page create');
                        console.log(page);
                        widget._page = page._id;
                        console.log(widget._page);
                        page.widgets.push(widget._id);
                        page.save();
                        widget.save();
                        return widget;
                    },function (err) {
                        console.log(err);
                        return err;
                    })
            },
            function(err){

                return err;
            });

}
function findWidgetById(widgetId) {
    console.log('inside findWidgetById');
    return WidgetModel.findOne({_id: widgetId});

}
function updateWidget(widgetId, widget) {
    console.log(widget);
    // return  WidgetModel.update({"_id": widgetId},
    //     {   name : widget.name,
    //         text : widget.description});
    return WidgetModel.update({_id:widgetId},{$set: widget});

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

        widgetModel
            .updateWidget(widgetId, imgWidget)
            .then(function (response) {
                if(response.ok===1&&response.n===1){

                    console.log("in hereeeee1");
                    widgetModel
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

    if(imageUrl && imageUrl.search('http') == -1){

        fs.unlink(publicDirectory+imageUrl, function (err) {
            if(err){
                console.log(err);
                return;
            }
            console.log('successfully deleted '+publicDirectory+imageUrl);
        });
    }
}

function deleteWidget(widgetId){
    return WidgetModel.findById(widgetId).populate('_page').then(function (widget) {
        widget._page.widgets.splice(widget._page.widgets.indexOf(widgetId),1);
        widget._page.save();
        if(widget.type == "IMAGE"){
            deleteUploadedImage(widget.url);
        }
        return WidgetModel.remove({_id:widgetId});
    }, function (err) {
        console.log(err);
        return err;
    });
}

function deleteWidgetOfPage(widgetId) {
    console.log(widgetId);
    return WidgetModel.find({_id : widgetId})
        .then(function (widget) {
            console.log('inside widget model delete widget of page');
            console.log(widget);
            if(widget.type == "IMAGE"){
                deleteUploadedImage(widget.url);
            }
            return WidgetModel.remove({_id: widgetId});
        }, function (err) {
            console.log(err);
            return err;
        });
}
function sortWidget(index1, index2, pid) {
    PageModel
        .findPageById(pid)
        .then(function (page) {


            for (var i = index1; i < index2; i++) {
                var temp = page.widgets[i];
                page.widgets[i] = page.widgets[i + 1];
                page.widgets[i + 1] = temp;
            }

            for (var i = index1; i > index2; i--) {
                var temp = page.widgets[i];
                page.widgets[i] = page.widgets[i - 1];
                page.widgets[i - 1] = temp;
            }

            PageModel
                .update({_id: pid}, {$set: {widgets: page.widgets}}, function(err, updatedPage) {
                    // console.log("UPDATED");
                    PageModel
                        .findPageById(pageId)
                        .then(function (page) {
                           return page;
                        });
                });


        });
}


module.exports = WidgetModel;


