/**
 * Created by chandrika2311 on 2/7/17.
 */
(function() {
    angular
        .module("WebAppMaker")/** One argument means we are reading the document*/
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/template/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model" /** Design Pattern: controller can be refered by this name, this is used
                                         so no ambiguity between any data variables **/
            })
            .when("/profile/:uid", {
                templateUrl: "views/user/template/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/template/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/page-edit", {
                templateUrl: "views/user/page-edit.view.client.html"
            })
            .when("/page-list", {
                templateUrl: "views/user/page-list.view.client.html"
            })
            .when("/page-new", {
                templateUrl: "views/user/page-new.view.client.html"
            })
            .when("/website-edit", {
                templateUrl: "views/website/template/website-edit.view.client.html"
            })
            .when("/website-list", {
                templateUrl: "views/website/template/website-list.view.client.html"
            })
            .when("/website-new", {
                templateUrl: "views/website/template/website-new.view.client.html"
            })
            .when("/widget-list", {
                templateUrl: "views/widget/Template/widget-list.view.client.html"
            })
            .when("/widget-chooser", {
                templateUrl: "views/widget/Template/widget-chooser.view.client.html"
            })
            .when("/widget-heading", {
                templateUrl: "views/widget/Template/widget-heading.view.client.html"
            })
            .when("/widget-image", {
                templateUrl: "views/widget/Template/widget-image.view.client.html"
            })
            .when("/widget-youtube", {
                templateUrl: "views/widget/Template/widget-youtube.view.client.html"
            })


    }})();