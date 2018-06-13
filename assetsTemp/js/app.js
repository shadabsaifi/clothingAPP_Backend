'use strict';
let app = angular.module('getFriends', ['ngRoute', 'ui.router', 'ckeditor', 'toastr', 'ui.bootstrap', 'ngStorage'])

// app.factory('interceptorFactory',()=>{
//     return {
//         request:(config)=>{
//             return config
//         }
//     }
// })

let interceptorFn = ($q, $localStorage, $state, toastr,$location) => {
    return {
        request: (config) => {
            // alert('request ==>>'+$location.path())
            let currUrl = $location.path().split('/')[1]
        //    alert("currentURL====>>>"+currUrl)
            if ($localStorage.admin && $localStorage.admin.token) {
                config.headers['token'] = $localStorage.admin.token
            }
            else{
                if(currUrl != 'resetPassword')
                    $state.go('login');
                // toastr.success("111111111111111", "Error")
                
            }
            return config;
        },
        response: (result) => {  
            // alert('result')        
            if (result.data.responseMessage === "Token Invalid"||result.data.responseMessage === "Token Missing") {
                toastr.success("Seesion", "expired")
                $state.go('login');
            }
            return result;
        }
    }
}

app.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
    // $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push(interceptorFn)
    $stateProvider
        .state('header', {
            url: '/header',
            templateUrl: 'templates/header.html',
            controller: 'headerCtrl',
            // abstract:true
        })
        .state('resetPassword',{
            // url:'/resetPassword',
            url:'/resetPassword/:id',
            controller:'resetCtrl',
            templateUrl:'templates/resetPassword.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })
        .state('header.userMgmt', {
            url: '/userMgmt',
            controller: 'userMgmtCtrl',
            templateUrl: 'templates/userMgmt.html'
        })
        .state('header.dashBoard', {
            url: '/dashBoard',
            controller: 'dashBoardCtrl',
            templateUrl: 'templates/dashBoard.html'
        })
        .state('header.subPackageMgmt', {
            url: '/subPackageMgmt',
            controller: 'subPackageMgmtCtrl',
            templateUrl: 'templates/subPackageMgmt.html'
        })
        .state('header.static', {
            url: '/static',
            controller: 'staticCtrl',
            templateUrl: 'templates/static.html'
        })
        .state('header.addNewPackage', {
            url: '/addNewPackage',
            controller: 'addNewPackageCtrl',
            templateUrl: 'templates/addNewPackage.html'
        })
        .state('header.viewUser', {
            url: '/viewUser',
            controller: 'viewUserCtrl',
            templateUrl: 'templates/viewUser.html'
        })
        .state('header.viewPackage', {
            url: '/viewPackage',
            controller: 'viewPackageCtrl',
            templateUrl: 'templates/viewPackage.html'
        })
        .state('header.viewAdminProfile', {
            url: '/viewAdminProfile',
            controller: 'viewAdminProfileCtrl',
            templateUrl: 'templates/viewAdminProfile.html'
        })
        .state('header.updateAdmin',{
            url:'/updateAdmin',
            controller:'updateAdminCtrl',
            templateUrl:'templates/updateAdmin.html'
        })
        .state('header.premiumList',{
            url:'/premiumList',
            controller:'premiumListCtrl',
            templateUrl:'templates/premiumList.html'
        })
        .state('header.addPremiumPackage',{
            url:'/addPremiumPackage',
            controller:'addPremiumPackageCtrl',
            templateUrl:'templates/addPremiumPackage.html'
        })
        .state('header.viewPremium',{
            url:'/viewPremium',
            controller:'viewPremiumCtrl',
            templateUrl:'templates/viewPremium.html'
        })
        .state('header.boostList',{
            url:'/boostList',
            controller:'boostListCtrl',
            templateUrl:'templates/boostList.html'
        })
        .state('header.viewBoost',{
            url:'/viewBoost',
            controller:'viewBoostCtrl',
            templateUrl:'templates/viewBoost.html'
        }) .state('header.addBoostPackage',{
            url:'/addBoostPackage',
            controller:'addBoostPackageCtrl',
            templateUrl:'templates/addBoostPackage.html'
        })
       
        
    $urlRouterProvider.otherwise('/login');

}]);

// app.factory('socket', function(socketFactory) {
//     return socketFactory();
// });