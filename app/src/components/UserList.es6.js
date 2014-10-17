/**
 * @jsx React.DOM
 */
import * as React from 'react';
import UserItem from './UserItem.es6';

var UserList = React.createClass({

	render() {
		var userItems = this.props.users.map(user => <UserItem user={user}/>);
		
		return <ul className="list-group">{userItems}</ul>;
	}
});

export default UserList;