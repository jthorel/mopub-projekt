var React = require("react");

//STORE:
var ActivityStore = require("../../stores/ActivityStore.js");
//VIEWS:
var SimpleListView = require("../list/SimpleListView.jsx");
var LoadingView = require("../misc/LoadingView.jsx");

module.exports = React.createClass({

	getInitialState: function(){
		return {
			collection: false,
			radiusFilter: 3000
		}
	},


	// Before render, call to get the collection
	// Update the collection-state when done.
	componentWillMount: function(){
		
		var _this = this;
		ActivityStore.getAll( function(err, data){	
			_this.setState({ collection: data });
			
		});
	},

	// Update state when user changes the value
	handleFilterChange: function(e){
		this.setState({
			radiusFilter: e.target.value
		});
	},

	// Render
	// Shows a loading view while the collection-state is false.
	// Renders a List-component with the radiusFilter-state as prop when collection-state is populated
	render: function(){ 
		return(
			<div className="col-md-3">
	            <div className="panel panel-default">
	            	<div style={{borderBottom: "1px solid #d9230f"}}>
	                	<h4> Activities close to you </h4>

	                </div>
	                <h5>Range in meters: <input 
						onChange={this.handleFilterChange} 
						value={this.state.radiusFilter} 
						type="text"
						placeholder="Radius in meters" /></h5>
	                {this.state.collection ? 
	                	<SimpleListView collection={this.state.collection}
	                		filterString={this.state.filterString}
	                		radiusFilter={this.state.radiusFilter}/>
	                	: <LoadingView/>}
	            </div>
            </div>
		)
	}
});