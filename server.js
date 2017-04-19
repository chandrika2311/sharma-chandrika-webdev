var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var Catalog = require('udacity-api').Catalog;
var User = require('udacity-api').User;
require ("./test/app.js")(app);

var cookieParser =  require("cookie-parser");
var session = require("express-session");
app.use(session({ secret: "This is a secret",
    resave: true,
    saveUninitialized: true}));
app.use(cookieParser());

var passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
// var assignment = require("./assignment/app.js");
// assignment(app);

var project = require("./assignment_PROJECT/app");
project(app);



//Server listens through port 3000
var port = process.env.PORT || 3000;







app.listen(port);