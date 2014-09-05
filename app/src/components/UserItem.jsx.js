/**
* @jsx React.DOM
*/

import React from 'react';

var UserItem = React.createClass({
	render() {
		return (<li className="list-group-item">
					<div>
						<img src={this.props.user.photo_big} />
					</div>
        			<div>{this.props.user.first_name}</div> 
        			<div>{this.props.user.last_name}</div>
    			</li>);
	}
});

export default UserItem;