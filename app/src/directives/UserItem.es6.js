import React from 'react';
import UserItemComponent from '../components/UserItem.jsx';

var UserItem = ($timeout) => ({
	restrict: "AE",
	scope: {
		user: '@'
	},
	link: (scope, element, attributes) => {
		var user = scope.$eval(scope.user);
		$timeout(() => {
			React.renderComponent(UserItemComponent({user: user}), element[0]);
		}, 0);
	}
});


export default UserItem;