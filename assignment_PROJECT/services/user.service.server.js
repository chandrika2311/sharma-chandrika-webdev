/**
 * Created by chandrika2311 on 2/28/17.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function (app, UserModel) {

    var bcrypt = require("bcrypt-nodejs");
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.post('/api/splice/project/:userId', spliceProjectFromUser);
    app.get ('/api/loggedin', loggedin);
    app.get ('/api/allUsers', getAllUsers);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.get("/api/getmentors",findAllMentors);
    app.put("/api/user/:userId", updateUser);
    app.get("/api/user/:userId", findUserByUsername);
    app.get("/api/user/:username/:password", findUserByUsername);
    app.post("/api/user", createUser);
    app.get("/api/user/:userId/courses",findAllCoursesOfUser);
    app.delete("/api/user/:userId", deleteUser);



    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/facebook',passport.authenticate('facebook',{ scope : 'email'}));


    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/#/mentor/login'
        }), function(req, res){
            var url = '/assignment_PROJECT/index.html#/mentor';
            res.redirect(url);
        });

    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook', {
    //     failureRedirect: '#/student/login'
    // }), function(req, res){
    //     var url = '/assignment_PROJECT/index.html#/student';
    //     res.redirect(url);
    // });

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_ID,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id','displayName', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
    };
    //passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));


    function findAllMentors(req,res) {
        UserModel.findAllMentors()
            .then(function (mentors_found) {

                var mentors = mentors_found;
                res.json(mentors);

            });
    }
    function login(req, res) {
        var user = req.user;
            console.log(user);
            res.json(user);


    }
    function getAllUsers(req,res) {
        UserModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            }, function (error) {
                console.log(error);
                res.sendStatus(400).send(error);
            });
    }
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }
    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        UserModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }


    function loggedin(req, res) {

        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function createUser(req,res){

        var newUser = req.body;
        console.log(newUser);

        UserModel
            .createUser(newUser)
            .then(function(user) {

                res.send(user);
            }, function (error) {
                res.sendStatus(400).send(error);
            });

    }
    function findUserByUserId( req, res){
        var userId = req.params['userId'];


        UserModel
            .findUserById(userId)
            .then(function(user) {

                res.send(user);
            }, function (error) {
                res.sendStatus(400).send(error);
            });

    }
    function findUserByCredentials( req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        UserModel
            .findUserByCredentials(username, password)
            .then(function(user) {
                console.log('user found in credentials');
                console.log(user);
                res.json(user[0]);
            }, function (error) {
                res.sendStatus(400).send(error);
            });

    }


    function updateUser( req, res) {
        var userId = req.params['userId'];
        var olduser = req.body;
        UserModel
            .updateUser(userId, olduser)
            .then(function(user) {
                res.send(user);
            }, function (error) {
                res.sendStatus(400).send(error);
            });


    }
    function findUserByUsername(req, res) {
        var username = req.query['username'];

        UserModel
            .findUserByUsername(username)
            .then(function(user) {
                res.send(user);
            });
    }
    function findUser(req,res) {
        var username= req.query['username'];
        var password= req.query['password'];
        if (username && password){
            findUserByCredentials(req,res);
        }else if (username){
            findUserByUsername(req,res);
        }
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        console.log("UserId in server",userId);
        UserModel
            .deleteUser(userId)
            .then(function (response) {

                res.sendStatus(200);
            },function (err) {

                res.sendStatus(404);
            });
    }
    function findAllCoursesOfUser(req,res) {
        var userId = req.params.userId;
        UserModel.findUserById(userId)
            .success(function (response) {
                res.send(response.data);
            })
    }

    function localStrategy(username, password, done) {


        UserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user.role == "admin"){
                        if(user != null && user.username === username && user.password === password)
                        {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    }else{
                    // if(user.username === username && user.password === password)
                    if(user != null && user.username === username && bcrypt.compareSync(password, user.password))
                     {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }}
                },
                function(err) {
                    if (err) {
                        return done(err); }
                }
            );
    }

/////--------------------------------------------------------------    --------------------------------------------------------------
    function googleStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        console.log("creating new user");
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstname: profile.name.givenName,
                            role : "mentor",
                            //address:profile.name.address,
                            lastname:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return UserModel
                            .findUserByUsername(newGoogleUser.username)
                            .then(function (user) {
                                console.log("when user with username check returns");
                                if(user != null){
                                    return done(null, user);
                                }
                                return UserModel
                                    .createUser(newGoogleUser)
                                    .then(function (user) {
                                        return done(null, user);
                                    },
                                        function(err) {
                                            if (err) { return done(err); }
                                        });
                            },
                                function(err) {
                                    if (err) { return done(err); }
                                });
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                });
    }
/////--------------------------------------------------------------    --------------------------------------------------------------
    function facebookStrategy(token, refreshToken, profile, done) {
        UserModel
            .findUserByFacebookId(profile.id)
            .then(function(user) {
                    if(user) {
                        // If User exists
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            firstName:  names[0],
                            lastName:  names[1],
                            role : "student",
                            username:  emailParts[0],
                            facebook: {
                                id:    profile.id,
                                token: token
                            },
                            email: profile.emails[0].value
                        };
                        return UserModel
                            .findUserByUsername(newFacebookUser.username)
                            .then(function (user) {
                                if(user != null){
                                    return done(null, user);
                                }
                                return UserModel
                                    .createUser(newFacebookUser)
                                    .then(function (user) {
                                        return done(null, user);
                                    });
                            });
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                });
    }

/////-------------------------------------------------------------------------------------------------------------------


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
    function spliceProjectFromUser(req,res) {
        var userId = req.params.userId;
        var project = req.body;
        UserModel.spliceProjectFromUser(userId, project._id)
            .then(function (user) {
                console.log("user got in serverjs",user);
                res.send(user);
            })

    }


};
