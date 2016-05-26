var React = require("react");
var Link = require("react-router").Link;
var moment = require('moment');

var ListCell = React.createClass({

	propTypes: {
		model: React.PropTypes.object.isRequired //A Backbone-Model
	},

	render: function(){
		var href = "/activity/" + this.props.model.id;
		var modelicon = "/img/"+this.props.model.get("type")+".png";
		return(
			<Link className="list-group-item" to={href} >
				<div className="media">
					<div className="media-left">
						<img className="media-object" src={modelicon} style={{maxWidth:"32px"}}/>
					</div>
					<div className="media-body">
						<h4 className="media-heading">{this.props.model.get("title")} 
							<span className="glyphicon glyphicon-user pull-right" style={{padding: "0.5em"}}>
								{this.props.model.users.length}
								</span>
						</h4>
						<span style={{fontSize: "0.8rem"}}>
							{moment(this.props.model.get("date")).format('dddd MMMM Do YYYY HH:mm')}
						</span>
					</div>
				</div>
			</Link>
		)
	}
});

module.exports = ListCell;