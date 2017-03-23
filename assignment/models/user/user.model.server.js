/**
 * Created by chandrika2311 on 3/21/17.
 */

    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server');
    var UserModel = mongoose.model('UserModel', UserSchema);



    UserModel.createUser = createUser;
    UserModel.findUserById = findUserById;
    UserModel.findUserByUsername = findUserByUsername;
    UserModel.findUserByCredentials = findUserByCredentials;
    UserModel.deleteUser = deleteUser;
    UserModel.updateUser = updateUser;
    UserModel.setModel = setModel;


function createUser(user) {
    console.log('cu');
    console.log('in model.createUser');
    console.log(user);
    return UserModel.create(user);
}
function findUserByCredentials(username, password) {
    console.log(username);
    console.log(password);
    return UserModel.find({username: username, password: password});
}
function updateUser(userId, user) {
    console.log('in model.updateUser');
    return UserModel.update({_id : userId},
        {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password

        });
}
function setModel(_model) {
    model = _model;
}
function findUserByUsername(username) {
    console.log(username);
    console.log('in model.findUserByUsername');
    return UserModel.find({ username: username });

}

function findUserById(userId){
    return UserModel.findById(userId);
}

function deleteUser(userId) {
    return UserModel.findById({_id: userId})
        .then(function (user) {
            console.log('delete user');
            console.log(user);
            var websitesOfUser = user.websites;
            return recursiveDelete(websitesOfUser, userId);
        }, function (err) {
            return err;
        });

function recursiveDelete(websitesOfUser, userId) {
    if(websitesOfUser.length == 0){
        // All websites of user successfully deleted
        // Delete the user
        return UserModel.remove({_id: userId})
            .then(function (response) {

                if(response.result.n == 1 && response.result.ok == 1){
                    return response;
                }
            }, function (err) {
                return err;
            });
    }

    return model.WebsiteModel.deleteWebsiteAndChildren(websitesOfUser.shift())
        .then(function (response) {
            if(response.result.n == 1 && response.result.ok == 1){
                return recursiveDelete(websitesOfUser, userId);
            }
        }, function (err) {
            return err;
        });
}


}
    module.exports = UserModel;


