var React = require("react");
var Backbone = require("backbone");

var LoginInputView = React.createClass({

	propTypes: {
		title: React.PropTypes.string.isRequired,
		type: React.PropTypes.string.isRequired,
		name: React.PropTypes.string.isRequired,
		error: React.PropTypes.bool.isRequired
	},

	render: function() {

		return (
			<div className={"form-group " + (this.props.error ? "has-error" : "") }>
				<label className="col-sm-2 control-label">{this.props.title}</label>
				<div className="col-sm-10">
					<input type={this.props.type} name={this.props.name} className="form-control" placeholder={this.props.title} />
				</div>
			</div>
			)
	}
});


module.exports = LoginInputView;