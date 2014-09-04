import angular from 'angular';
import MainCtrl from './MainCtrl.es6';

angular.module('app.controllers', []).controller({
    'MainCtrl': ['$scope', 'VKApi', MainCtrl]
});