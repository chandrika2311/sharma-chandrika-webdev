/**
 * Created by chandrika2311 on 3/21/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var UserModel1 = require("./user/user.model.server");
    var WebsiteModel = require("./website/website.model.server");
    var PageModel = require("./page/page.model.server");
    var WidgetModel = require("./widget/widget.model.server");
    var model = {
        UserModel1: UserModel1,
        WebsiteModel: WebsiteModel,
        PageModel: PageModel,
        WidgetModel: WidgetModel
    };

    UserModel1.setModel(model);
    WebsiteModel.setModel(model);
    PageModel.setModel(model);
    WidgetModel.setModel(model);


    mongoose.connection.on('connected', function(){
    });
    return model;
};