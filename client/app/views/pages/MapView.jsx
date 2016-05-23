var React = require("react");

//STORE:
var ActivityStore = require("../../stores/ActivityStore.js");
//VIEWS:
var SimpleListView = require("../list/SimpleListView.jsx");
var LoadingView = require("../misc/LoadingView.jsx");
var GoogleMap = require("../misc/GoogleMap.jsx");

module.exports = React.createClass({

	getInitialState: function(){
		return {
			collection: false,

		}
	},

	componentWillMount: function(){
		
		var _this = this;
		ActivityStore.getAll( function(err, data){
			_this.setState({ collection: data });
			
		});
	},

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