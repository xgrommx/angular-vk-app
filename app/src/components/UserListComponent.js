import React from 'react';
import UserItem from './UserItemComponent';
import { map } from 'lodash';

var UserList = React.createClass({

    render() {
        var userItems = map(this.props.users, user => <UserItem user={user}/>);

        return <ul className='list-group'>{ userItems }</ul>;
    }
});

export default UserList;