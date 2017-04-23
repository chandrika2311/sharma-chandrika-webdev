/**
 * Created by chandrika2311 on 3/21/17.
 */

var mongoose = require('mongoose');

var WebsiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel1'},
    name: String,
    description: String,
    pages:  [{type: mongoose.Schema.Types.ObjectId, ref:'PageModel'}],
    dateCreated: {type:Date, default: Date.now()}
},{collection:'web.development.website.assignment5'});
module.exports = WebsiteSchema;// puts something in the namespace for someone else outside to use it.