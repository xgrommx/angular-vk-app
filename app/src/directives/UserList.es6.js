import * as React from 'react';
import UserItemComponent from '../components/UserItem.es6';
import UserListComponent from '../components/UserList.es6';

var UserList = ($timeout) => ({
	restrict: "AE",
	scope: {
		users: '@'
	},
	link: (scope, element, attributes) => {
		attributes.$observe('users', users => {
            $timeout(() => {
                React.renderComponent(UserListComponent({users: angular.fromJson(users)}), element[0]);
            }, 0);
        });
	}
});


export default UserList;