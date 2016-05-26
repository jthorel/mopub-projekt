var React = require("react");
var backboneMixin = require('backbone-react-component');

//VIEWS:


var UserList = React.createClass({

	propTypes: {
		collection: React.PropTypes.object.isRequired, //A Backbone-Collection of users
	},



	render: function(){
		var _this = this;

		// Check and populate the list
		if(this.props.collection.length === 0) {
			rows = <div> There appears to be nothing here. </div>
		} else {	
			
			var rows = this.props.collection.models.map(function(model){
				var username = model.get("username");
				return <div key={username}>{username}</div>
			})
		}

		// Render list
		return (
			<div className="list-group">
				{rows}
			</div>
		)
	}
});

module.exports = UserList;