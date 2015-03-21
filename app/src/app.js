var app = angular.module('app', ['ui.router', 'ncy-angular-breadcrumb', 'ngAnimate', 'app.controllers', 'app.services', 'app.directives', 'app.animations']);

app.constant('fields', ['uid', 'first_name', 'last_name', 'nickname', 'sex',
    'birthdate', 'city', 'country', 'timezone', 'photo', 'photo_medium',
    'photo_big', 'domain', 'has_mobile', 'rate', 'contacts', 'education', 'online', 'counters']);

app.config(['VKApiProvider', VKApiProvider => {
    VKApiProvider.setSettings({
        apiId: 4150267,
        apiVersion: '5.10'
    });
}]).config(['$stateProvider', '$urlRouterProvider', 'fields', ($stateProvider, $urlRouterProvider, fields) => {
    $urlRouterProvider.otherwise('/me');

    $stateProvider.state('me', {
        url: '/me',
        templateUrl: './app/src/partials/me.html',
        data: {
            ncyBreadcrumbLabel: 'Home page'
        }
    });
    $stateProvider.state('friends', {
        url: '/friends',
        templateUrl: './app/src/partials/friends.html',
        controller: 'FriendsCtrl as f',
        resolve: {
            friends: VKApi => VKApi.getFriends(fields)
        },
        data: {
            ncyBreadcrumbLabel: 'Friends page'
        }
    });
    $stateProvider.state('followers', {
        url: '/followers',
        templateUrl: './app/src/partials/followers.html',
        controller: 'FollowersCtrl as f',
        resolve: {
            followers: VKApi => VKApi.getFollowers().then(response => VKApi.getUser(fields, response.items))
        },
        data: {
            ncyBreadcrumbLabel: 'Followers page'
        }
    })
}]);