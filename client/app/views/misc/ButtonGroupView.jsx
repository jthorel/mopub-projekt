var React = require("react");

module.exports = React.createClass({


	// Renders an edit-button if the prop editing is false
	// Renders a save and cancel-button if the prop editing is true
	// Also renders a trashcan if the methods-prop contains a delete method
	render: function() {

		var methods = this.props.methods;

		if(this.props.editing){
			return (
				<div>
					<div className="btn-group">
						<a onClick={methods.cancel} className="btn btn-warning"> Cancel </a>
						<a onClick={methods.save} className="btn btn-success"> Save </a>
					</div>
		
					{methods.delete && 
						<a className="pull-right" href="javascript:void(0)" onClick={methods.delete}> 
							<span className="glyphicon glyphicon-trash"/>
						</a>
					}
				</div>

			)
		} else {
			return (
				<div className="panel-heading">
					<a onClick={methods.edit} className="btn btn-default"> Edit </a>
				</div>
			)
		}
	},

});
