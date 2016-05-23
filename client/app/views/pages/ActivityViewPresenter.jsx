var React = require("react");


//STORE:
var ActivityStore = require("../../stores/ActivityStore.js");

//VIEWS:
var ActivityView = require("./ActivityView.jsx");
var LoadingView = require("../misc/LoadingView.jsx");
var ActivityViewPresenter = React.createClass({

	getInitialState: function(){
		return {
			model: false
		}
	},

	componentWillMount: function(){
		var _this = this;
		ActivityStore.getByID(this.props.params.id, function(err, data){
			_this.setState({ model: data });
		})
	},

	render: function () {
		if(this.state.model){
			return <ActivityView model={this.state.model} />
		} else {
			return <LoadingView />
		}
	}

});

module.exports = ActivityViewPresenter;
