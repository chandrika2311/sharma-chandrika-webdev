/**
 * Created by chandrika2311 on 2/21/17.
 */
/**
 * Created by chandrika2311 on 2/7/17.
 */
(function() {
    angular
        .module("DigitalMagazineMaker")/** One argument means we are reading the document*/
        .config(Config);
    function Config($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "views/FirstPage.view.client.html"
                /** Design Pattern: controller can be refered by this name, this is used
                 so no ambiguity between any data variables **/
            })

    }})();