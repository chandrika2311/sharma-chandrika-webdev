/**
 * Created by chandrika2311 on 3/21/17.
 */
var model = null;
var mongoose = require('mongoose');
var WebsiteSchema = require('./website.schema.server');
var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);



WebsiteModel.createWebsite = createWebsite;
WebsiteModel.findWebsitesByUser = findWebsitesByUser;
WebsiteModel.setModel = setModel;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.deleteWebsiteAndChildren = deleteWebsiteAndChildren;

function setModel(_model) {
    model = _model;

}
function createWebsite(userId, website) {
    console.log(website);
    console.log('website model');
    return WebsiteModel
        .create(website)
        .then(
            function(website){
                console.log('inside function website');
                console.log(website);
                console.log(userId);
                return model.UserModel1.findUserById(userId)
                    .then(function (user) {
                        console.log('inside website, user');
                        console.log(user);
                        website._user = user._id;
                        user.websites.push(website._id);
                        website.save();
                        user.save();
                        console.log(website);

                        return website;
                    },function (err) {
                        console.log("user err" + err);
                        return err;
                    })
            },
            function(err){
                return err;
            });
}
function findWebsitesByUser(userId) {
    return WebsiteModel.find({"_user": userId});
}
function findWebsiteById(websiteId) {
    return WebsiteModel.findOne({_id: websiteId});

}
function updateWebsite(websiteId, website) {
    return  WebsiteModel.update({"_id": websiteId},
        {   name : website.name,
            description : website.description});

}
function deleteWebsite(websiteId){
    // Delete a website, its reference in parent and its children
    return WebsiteModel.findOne({_id:websiteId}).populate('_user').then(function (website) {
        website._user.websites.splice(website._user.websites.indexOf(websiteId),1);
        website._user.save();
        return deleteWebsiteAndChildren(websiteId);
    }, function (err) {
        return err;
    });
}

function recursiveDelete(pagesOfWebsite, websiteId) {
    if(pagesOfWebsite.length == 0){
        // All pages of website successfully deleted
        // Delete the website
        return WebsiteModel.remove({_id: websiteId})
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return response;
                }
            }, function (err) {
                return err;
            });
    }

    return model.PageModel.deletePageAndChildren(pagesOfWebsite.shift())
        .then(function (response) {
            if(response.result.n == 1 && response.result.ok == 1){
                return recursiveDelete(pagesOfWebsite, websiteId);
            }
        }, function (err) {
            return err;
        });
}

    function deleteWebsiteAndChildren(websiteId){
        // Delete the website and its children (pages)
        return WebsiteModel.findById({_id: websiteId}).select({'pages':1})
            .then(function (website) {
                var pagesOfWebsite = website.pages;
                return recursiveDelete(pagesOfWebsite, websiteId);
            } , function (err) {
                return err;
            });
}


module.exports = WebsiteModel;