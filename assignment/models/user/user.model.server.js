/**
 * Created by chandrika2311 on 3/21/17.
 */

    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server');
    var UserModel1 = mongoose.model('UserModel1', UserSchema);



UserModel1.createUser = createUser;
UserModel1.findUserById = findUserById;
UserModel1.findUserByUsername = findUserByUsername;
UserModel1.findUserByCredentials = findUserByCredentials;
UserModel1.deleteUser = deleteUser;
UserModel1.updateUser = updateUser;
UserModel1.setModel = setModel;


function createUser(user) {
    console.log('cu');
    console.log('in model.createUser');
    console.log(user);
    return UserModel1.create(user);
}
function findUserByCredentials(username, password) {
    console.log(username);
    console.log(password);
    return UserModel1.find({username: username, password: password});
}
function updateUser(userId, user) {
    console.log('in model.updateUser');
    return UserModel1.update({_id : userId},
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
    return UserModel1.find({ username: username });

}

function findUserById(userId){
    return UserModel1.findById(userId);
}

function deleteUser(userId) {
    return UserModel1.findById({_id: userId})
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
        return UserModel1.remove({_id: userId})
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
    module.exports = UserModel1;


