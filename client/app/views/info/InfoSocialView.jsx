var React = require("react");
var Backbone = require("backbone");

module.exports = React.createClass({

	propTypes: {
		model: React.PropTypes.object.isRequired, //A Backbone-Model
		marginRight : React.PropTypes.string
	},

	available: function(value) {
		if(value === "" || value === null) {
			return false;
		} else {
			return true;
		}
	},

	render: function() {

		var spt = this.props.model.get("spotify");
		var yt = this.props.model.get("youtube");
		var sc = this.props.model.get("soundcloud");

		var style = {
			width: "30px",
			height: "30px",
			marginRight: this.props.marginRight || "20px"
		}
		return (
			<div>
				<a href={spt} target="_new" onClick={this.onClick} >
					<img src="./img/icons/spt.png" style={style} className={(this.available(spt) ? "" : 'notavailable')}/>
				</a>
				<a href={yt} target="_new" onClick={this.onClick}>
					<img src="./img/icons/yt.png" style={style} className={(this.available(yt) ? "" : 'notavailable')}/>
				</a>
				<a href={sc} target="_new" onClick={this.onClick}>
					<img src="./img/icons/sc.png" style={style} className={(this.available(sc) ? "" : 'notavailable')}/>
				</a>
			</div>

		)
	},

	onClick: function(e) {
		e.stopPropagation();
	}

});