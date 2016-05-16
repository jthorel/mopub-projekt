var React = require("react");


//STORE:
var TracklistStore = require("../../stores/TracklistStore.js");

//VIEWS:
var TracklistView = require("./TracklistView.jsx");
var LoadingView = require("../misc/LoadingView.jsx");
var TracklistViewPresenter = React.createClass({

	getInitialState: function(){
		return {
			model: false
		}
	},

	componentWillMount: function(){
		var _this = this;
		TracklistStore.getByID(this.props.params.id, function(err, data){
			_this.setState({ model: data });
		})
	},

	render: function () {
		if(this.state.model){
			return <TracklistView model={this.state.model} />
		} else {
			return <LoadingView />
		}
	}

});

module.exports = TracklistViewPresenter;
