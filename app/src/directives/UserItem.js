import React from 'react';
import UserItemComponent from '../components/UserItemComponent';

/*@ngInject*/
var UserItem = ($timeout) => ({
    restrict: 'AE',
    scope: {
        user: '@'
    },
    link: (scope, element, attributes) => {
        attributes.$observe('user', user => {
            $timeout(() => {
                React.render(<UserItemComponent user={ angular.fromJson(user) }/>, element[0]);
            }, 0);
        });
    }
});


export default UserItem;