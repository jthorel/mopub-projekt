var React = require("react");
var InfoSocialView = require("../../info/InfoSocialView.jsx");
var OrderedListCellView = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},
	
	propTypes: {
		model: React.PropTypes.object.isRequired, //A Backbone-Model
		collection: React.PropTypes.object.isRequired
	},

	render: function(){

		var style = {
			display: "relative",
			margin: "0px 0px"
		}
		return(
			<div>
				<button onClick={this.navigate} className="list-group-item">
					<div className="row">
						<div className="col-md-1 col-xs-1">
							<h4> {this.props.collection.indexOf(this.props.model) + 1}. </h4>
						</div>
						<div className="col-md-7 col-sm-4 col-xs-5">
							<h4>{this.props.model.get("title")} <small> {this.props.model.get("artist")}</small></h4>
						</div>
						<div className="col-md-4 col-sm-7">
							<span className="pull-right socialviewlist">
								<InfoSocialView model={this.props.model} marginRight={"10px"} />
							</span>
						</div>
					</div>
				</button>
			</div>
		);
	},

	navigate: function(){
		this.context.router.push("/" + this.props.model.get("type") + "/" + this.props.model.id);
	}
});

module.exports = OrderedListCellView;