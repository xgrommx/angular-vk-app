import angular from 'angular';
import VkApiProvider from './VkApiProvider.es6';

angular.module('app.services', [])
    .factory('VK', ['$window', $window => angular.isDefined($window.VK) ? $window.VK : null])
    .provider('VKApi', VkApiProvider);