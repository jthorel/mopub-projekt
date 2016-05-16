var React = require("react");
var backboneMixin = require('backbone-react-component');

//VIEWS:
var InfoCellView = require("./InfoCellView.jsx");
var EditInfoCellView = require("./EditInfoCellView.jsx");
var InfoSocialView = require("./InfoSocialView.jsx");

var InfoView = React.createClass({

	mixins: [backboneMixin],

	propTypes: {
		model: React.PropTypes.object.isRequired, //A Backbone-Model
		editing: React.PropTypes.bool.isRequired
	},

	render: function(){ 

		if(this.props.editing){
			return(
				<div>
					<EditInfoCellView model={this.props.model} keyName={"title"} />
					<EditInfoCellView model={this.props.model} keyName={"artist"} />
					<EditInfoCellView model={this.props.model} keyName={"genre"} />
					<EditInfoCellView model={this.props.model} keyName={"length"} />
					<EditInfoCellView model={this.props.model} keyName={"youtube"} />
					<EditInfoCellView model={this.props.model} keyName={"soundcloud"} />
					<EditInfoCellView model={this.props.model} keyName={"spotify"} />
				</div>
				)
		} else {
			return (		
				<div className="panel-body">
						
					<h3>{this.props.model.get("title")}</h3><br/>
					by <span className="artist">{this.props.model.get("artist")}</span>
					<i>
						{this.props.model.get("genre") ? <div>{this.props.model.get("genre")}</div> : ""}
						{this.props.model.get("length") ? <div>{this.props.model.get("length")} minutes</div> : ""}
					</i>
					<h2><InfoSocialView model={this.props.model} marginRight="10px" /></h2>
				</div>
				);
		}
	}
});

module.exports = InfoView;