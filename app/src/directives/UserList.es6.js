import React from 'react';
import UserItemComponent from '../components/UserItem.jsx';
import UserListComponent from '../components/UserList.jsx';

var UserList = ($timeout) => ({
	restrict: "AE",
	scope: {
		users: '@'
	},
	link: (scope, element, attributes) => {
		var users = scope.$eval(scope.users);

		attributes.$observe('users', users => {
			console.log(users);
		});

		$timeout(() => {
			React.renderComponent(UserListComponent({users: users}), element[0]);
		}, 0);
	}
});


export default UserList;