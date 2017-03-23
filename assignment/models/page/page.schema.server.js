/**
 * Created by chandrika2311 on 3/21/17.
 */
var mongoose = require('mongoose');

var PageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
    name: String,
    title: String,
    description: String,
    widgets : [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
    dateCreated: {type:Date, default: Date.now()}
},{collection:'web.development.page.assignment5'});
module.exports = PageSchema;// puts something in the namespace for someone else outside to use it.