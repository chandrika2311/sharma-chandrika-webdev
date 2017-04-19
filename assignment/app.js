module.exports = function (app) {
    var model = require('./models/models.server')();

    require('./services/user.service.server')(app, model.UserModel);
    require('./services/website.service.server')(app, model.WebsiteModel);
    require('./services/page.service.server')(app, model.PageModel);
    require('./services/widget.service.server')(app, model.WidgetModel);
};