/**
* @jsx React.DOM
*/

import * as React from 'react';

var UserItem = React.createClass({
	render() {
		return (<li className="list-group-item">
					<div>
						<a data-ng-href="#/friends/1"><img src={this.props.user.photo_big} /></a>
					</div>
        			<div>{this.props.user.first_name}</div> 
        			<div>{this.props.user.last_name}</div>
    			</li>);
	}
});

export default UserItem;