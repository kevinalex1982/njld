var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/dashboard");

    $stateProvider

        .state("dashboard", {
            url:"/dashboard",
            templateUrl: "Dashboard.html"
        })
        .state("map", {
            url:"/map",
            templateUrl: "Map.html"
        })
        .state("mediacenter", {
            url:"/mediacenter",
            templateUrl: "MediaCenter.html"
        })
        .state("lightcontrol", {
        url:"/lightcontrol",
        templateUrl: "LightControl.html"
    });

});/**
 * Created by kevin on 2016/7/4.
 */
