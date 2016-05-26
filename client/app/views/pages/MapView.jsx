var React = require("react");

//STORE:
var ActivityStore = require("../../stores/ActivityStore.js");
//VIEWS:
var LoadingView = require("../misc/LoadingView.jsx");
var GoogleMap = require("../misc/GoogleMap.jsx");

module.exports = React.createClass({

	getInitialState: function(){
		return {
			collection: false,
		}
	},

	// Get all activities as a collection
	componentWillMount: function(){
		var _this = this;
		ActivityStore.getAll( function(err, data){
			_this.setState({ collection: data });
			
		});
	},

	// Render with component GoogleMap and collection as prop
	// LoadingView while collection is undefined
	render: function(){ 
		return(
			<div>
				<h3>Activities close by</h3>
				{this.state.collection ? 
					<GoogleMap collection={this.state.collection} zoom={12}/>
					:
					<LoadingView />}
			</div>
		);
	}
});