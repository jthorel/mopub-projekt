var React = require("react");
var backboneMixin = require('backbone-react-component');

//VIEWS:


var UserList = React.createClass({

	propTypes: {
		collection: React.PropTypes.object.isRequired, //A Backbone-Collection of users
	},


	render: function(){
		var _this = this;

		
		if(this.props.collection.length === 0) {
			rows = <div> There appears to be nothing here. </div>
		} else {	
			var rows = this.props.collection.models.map(function(model){

				return <div>{model.get("username")}</div>
			})
		}

		return (
			<div className="list-group">
				{rows}
			</div>
		)
	}
});

module.exports = UserList;