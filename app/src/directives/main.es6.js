import * as angular from 'angular';
import UserItem from './UserItem.es6';
import UserList from './UserList.es6';

angular.module('app.directives', [])
	   .directive('userItem', ['$timeout', UserItem])
	   .directive('userList', ['$timeout', UserList]);