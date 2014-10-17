import * as React from 'react';
import UserItemComponent from '../components/UserItem.es6';

var UserItem = ($timeout) => ({
	restrict: "AE",
	scope: {
		user: '@'
	},
	link: (scope, element, attributes) => {
        attributes.$observe('user', user => {
            $timeout(() => {
                React.renderComponent(UserItemComponent({user: angular.fromJson(user)}), element[0]);
            }, 0);
        });
	}
});


export default UserItem;