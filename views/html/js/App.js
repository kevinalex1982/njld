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
        .state("gameInfo", {
            url:"/gameInfo",
            templateUrl: "gameInfo.html"
        })
        .state("logInfo", {
        url:"/logInfo",
        templateUrl: "logInfo.html"
    });

});/**
 * Created by kevin on 2016/7/4.
 */
