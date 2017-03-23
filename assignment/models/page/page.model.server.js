/**
 * Created by chandrika2311 on 3/22/17.
 */

var model = null;
var mongoose = require('mongoose');
var PageSchema = require('./page.schema.server');
var PageModel = mongoose.model('PageModel', PageSchema);

PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;
PageModel.createPage = createPage;
PageModel.deletePageAndChildren = deletePageAndChildren;
PageModel.setModel = setModel;


function setModel(_model) {
    model = _model;
}
function findAllPagesForWebsite(websiteId) {

    return  PageModel.find({_website: websiteId});
}
function findPageById(pageId) {
    return  PageModel.find({_id: pageId});

}
function updatePage(pageId, page) {
    return  PageModel.update({"_id": pageId},
        {   name : page.name,
            description : page.description});
}
function deletePage(pageId) {
    console.log('inside page delete');
    return PageModel.findById(pageId).populate('_website')
        .then(function (page) {
            page._website.pages.splice(page._website.pages.indexOf(pageId),1);
            page._website.save();
            console.log(page);
            return PageModel.findById(pageId)
                .then(function (page) {
                    console.log('inside page model, delete page');
                    console.log(page);
                    var widgetsOfPage = page.widgets;
                    return recursiveDelete(widgetsOfPage, pageId);
                }, function (err) {
                    console.log(err);
                    return err;
                });
            }, function (err) {
                console.log(err);
                return err;
    });
}

function recursiveDelete(widgetsOfPage, pageId) {
    if(widgetsOfPage.length == 0){
        // All widgets of page successfully deleted
        // Delete the page
        return PageModel.remove({_id: pageId})
            .then(function (response) {
                console.log('inside page model,recursiveDelete ');
                console.log(response);
                if(response.result.n == 1 && response.result.ok == 1){
                    return response;
                }
            }, function (err) {
                console.log(err);
                return err;
            });
    }

    return model.WidgetModel.deleteWidgetOfPage(widgetsOfPage.shift())
        .then(function (response) {
            if(response.result.n == 1 && response.result.ok == 1){
                return recursiveDelete(widgetsOfPage, pageId);
            }
        }, function (err) {
            console.log(err);
            return err;
        });
}

function createPage(websiteId, page) {
    console.log(page);

    return PageModel
        .create(page)
        .then(
            function(page){
                console.log('inside page create');
                return model.WebsiteModel.findWebsiteById(websiteId)
                    .then(function (website) {
                        console.log('inside page website create');

                        page._website = website._id;
                        website.pages.push(page._id);
                        website.save();
                        page.save();
                        console.log(website);
                        return page;
                    },function (err) {
                        console.log(err);
                        return err;
                    })
            },
            function(err){
                console.log(err);
                return err;
            });
}
function deletePageAndChildren(pageId) {
    // Delete the page and its children (widgets)
    return PageModel.findById({_id: pageId})
        .then(function (page) {
            var widgetsOfPage = page.widgets;
            return recursiveDelete(widgetsOfPage, pageId);
        }, function (err) {
            return err;
        });
}
module.exports = PageModel;


