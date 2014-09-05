/**
* @jsx React.DOM
*/

import React from 'react';

var UserItem = React.createClass({
	render: function() {
		return (<li className="list-group-item">
					<div>
						<img src={this.props.user.photo} />
					</div>
        			<div>{this.props.user.first_name}</div> 
        			<div>{this.props.user.last_name}</div>
    			</li>);
	}
});

export default UserItem;