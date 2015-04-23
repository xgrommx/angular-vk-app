import VkApiProvider from './VkApiProvider';

angular.module('app.services', [])
    .factory('VK', $window => angular.isDefined($window.VK) ? $window.VK : null)
    .provider('VKApi', VkApiProvider);