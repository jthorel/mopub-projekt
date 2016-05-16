var React = require("react");


//STORE:
var TrackStore = require("../../stores/TrackStore.js");
//VIEWS:
var TrackView = require("./TrackView.jsx");
var LoadingView = require("../misc/LoadingView.jsx");


module.exports = React.createClass({

	getInitialState: function(){
		return {
			model: false
		}
	},

	componentWillMount: function(){
		var _this = this;
		TrackStore.getByID(this.props.params.id, function(err, data){
			_this.setState({ model: data });
		})
	},

	render: function(){

		if(this.state.model){
			return <TrackView model={this.state.model} />

		} else {
			return <LoadingView/>
		}
	}
});