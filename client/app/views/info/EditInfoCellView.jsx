var React = require("react");
var Backbone = require("backbone");

module.exports = React.createClass({

	propTypes: {
		model: React.PropTypes.object.isRequired, //A Backbone-Model
		keyName: React.PropTypes.string.isRequired
	},
	
	render: function() {

		var keyName = this.props.keyName;
		var value = this.props.model.get(this.props.keyName);

		return (
			<div className="form-group">
				<label>{capitalize(this.props.keyName)}</label>
				<input className="form-control" onChange={this.onChange} defaultValue={value} placeholder={capitalize(this.props.keyName)} />
			</div>
		)
	},

	onChange: function(e) {
		this.props.model.set(this.props.keyName, e.target.value);
	}

});



//HELPER FUNCTIONS
function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}