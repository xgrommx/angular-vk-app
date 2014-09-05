/**
 * @jsx React.DOM
 */
import React from 'react';
import UserItem from './UserItem.jsx';

var UserList = React.createClass({

	render: function() {
		var userItems = this.props.users.map(function(user) {
			return <UserItem user={user}/>;
		});
		return <ul className="list-group">{userItems}</ul>;
	}
});

export default UserList;