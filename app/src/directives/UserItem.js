import React from 'react';
import UserItemComponent from '../components/UserItemComponent';

var UserItem = ($timeout) => ({
	restrict: "AE",
	scope: {
		user: '@'
	},
	link: (scope, element, attributes) => {
        attributes.$observe('user', user => {
            $timeout(() => {
                React.render(React.createElement(UserItemComponent, {user: angular.fromJson(user)}), element[0]);
            }, 0);
        });
	}
});


export default UserItem;