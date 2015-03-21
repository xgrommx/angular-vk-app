import MainCtrl from './MainCtrl';
import FriendsCtrl from './FriendsCtrl';
import FollowersCtrl from './FollowersCtrl';
import UserDetailCtrl from './UserDetailCtrl';

angular.module('app.controllers', []).controller({
    'MainCtrl': ['$scope', 'VKApi', MainCtrl],
    'FriendsCtrl': ['$scope', 'friends', FriendsCtrl],
    'FollowersCtrl': ['$scope', 'followers', FollowersCtrl],
    'UserDetailCtrl': ['$scope', 'user', UserDetailCtrl]
});