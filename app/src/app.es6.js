//import 'traceur-runtime';
import angular from 'angular';

import './controllers/main.es6';
import './services/main.es6';

angular.module('app', ['app.controllers', 'app.services'], ['VKApiProvider', VKApiProvider => {
    VKApiProvider.setSettings({
        apiId: 4150267,
        apiVersion: '5.10'
    });
}]);