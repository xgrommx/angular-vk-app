import UserItem from './UserItem';
import UserList from './UserList';

angular.module('app.directives', [])
    .directive({
        'userItem': ['$timeout', UserItem],
        'userList': ['$timeout', UserList]
    });