/**
 * Created by chandrika2311 on 3/22/17.
 */


var mongoose = require('mongoose');

var WidgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
    widgetType : String,
    name : String,
    text : String,
    placeholder : String,
    description : String,
    url : String,
    width : String,
    height : String,
    rows : Number,
    size : Number,
    class : String,
    icon : String,
    deletable : Boolean,
    formatted : Boolean,
    date : {type:Date, default: Date.now()}
},{collection:'web.development.widget.assignment5'});

module.exports = WidgetSchema;// puts something in the namespace for someone else outside to use it.