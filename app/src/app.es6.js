import 'traceur-runtime';
import angular from 'angular';
import 'ui-router';

import './controllers/main.es6';
import './services/main.es6';
import './directives/main.es6';

// React components
// import UserList from 'webpack-traceur!jsx-loader!./components/UserList.jsx';

var app = angular.module('app', ['ui.router', 'app.controllers', 'app.services', 'app.directives']);

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
        templateUrl: './app/src/partials/me.html'
    }).state('friends', {
        url: '/friends',
        templateUrl: './app/src/partials/friends.html',
        controller: 'FriendsCtrl as f',
        resolve: {
            friends: VKApi => VKApi.getFriends(fields)
        }
    }).state('followers', {
        url: '/followers',
        templateUrl: './app/src/partials/followers.html',
        controller: 'FollowersCtrl as f',
        resolve: {
            followers: VKApi => VKApi.getFollowers().then(response => VKApi.getUser(fields, response.items))
        }
    })
}]);