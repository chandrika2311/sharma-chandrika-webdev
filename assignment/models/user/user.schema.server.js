/**
 * Created by chandrika2311 on 3/21/17.
 */
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
    phone: String,
    dateCreated: Date
},{collection:'web.development.user.assignment5'});
module.exports = UserSchema;// puts something in the namespace for someone else outside to use it.
