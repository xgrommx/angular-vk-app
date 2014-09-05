import angular from 'angular';
import MainCtrl from './MainCtrl.es6';
import FriendsCtrl from './FriendsCtrl.es6';
import FollowersCtrl from './FollowersCtrl.es6';

angular.module('app.controllers', []).controller({
    'MainCtrl': ['$scope', 'VKApi', MainCtrl],
    'FriendsCtrl': ['$scope', 'friends', FriendsCtrl],
    'FollowersCtrl': ['$scope', 'followers', FollowersCtrl]
});