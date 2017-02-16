/**
 * Created by chandrika2311 on 2/7/17.
 */
(function() {
    angular
        .module("WebAppMaker")/** One argument means we are reading the document*/
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/template/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model" /** Design Pattern: controller can be refered by this name, this is used
                 so no ambiguity between any data variables **/
            })
            .when("/login", {
                templateUrl: "views/user/template/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model" /** Design Pattern: controller can be refered by this name, this is used
                                         so no ambiguity between any data variables **/
            })
            .when("/register", {
                templateUrl: "views/user/template/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model" /** Design Pattern: controller can be refered by this name, this is used
                 so no ambiguity between any data variables **/
            })

            .when("/user/:uid", {
                templateUrl: "views/user/template/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/template/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/template/website-new.view.client.html",
                controller : "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/template/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/template/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/template/page-new.view.client.html",
                controller:"NewPageController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/template/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                    templateUrl: "views/widget/widget-list.view.client.html"
                })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html"

            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: "views/widget/widget-edit.view.client.html"
            })

    }})();