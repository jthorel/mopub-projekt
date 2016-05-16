var React = require("react");

var backboneMixin = require("backbone-react-component");
//STORE:
var TrackStore = require("../../stores/TrackStore.js");
//VIEWS:
var SimpleListView = require("../list/SimpleListView.jsx");
var LoadingView = require("../misc/LoadingView.jsx");

module.exports = React.createClass({

	mixins: [backboneMixin],
	
	getInitialState: function(){
		return {
			collection: TrackStore.getAll()
		}
	},

	componentWillMount: function(){
		var _this = this;
		this.state.collection.once("sync", function(){
			this.forceUpdate();
		}, this);	
	},

	render: function(){ 

		return(
            <div className="panel panel-default">
            	<div style={{borderBottom: "1px solid #d9230f"}}>
                	<h4> Latest Tracks</h4>
                </div>
                <br/>
                {this.state.collection ? 
                	<SimpleListView collection={this.state.collection} type="unordered"/>
                	: <LoadingView/>}
            </div>
		)
	}
});