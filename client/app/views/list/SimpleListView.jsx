var React = require("react");
var backboneMixin = require('backbone-react-component');

//VIEWS:
var SimpleListUnorderedCellView = require("./cell/SimpleListUnorderedCellView.jsx");
var LoadingView = require("../misc/LoadingView.jsx");




var SimpleListView = React.createClass({

	getInitialState: function(){
		return {
			userPosition: "",
			rows: ''
		}
	},

	propTypes: {
		collection: React.PropTypes.object.isRequired, //A Backbone-Collection of tracks
		type: React.PropTypes.string.isRequired 
	},

	insideRadius: function(actPos, filter){
		var googlePos = new google.maps.LatLng(actPos[0], actPos[1]);
		var distance = google.maps.geometry.spherical.computeDistanceBetween(this.state.userPosition, googlePos);
		if(distance <= filter){
			return true
		} else {
			return false
		}

	},

	setRows: function(radiusFilter) {
		var _this = this;
		if(this.props.collection.length === 0) {
			var rows = <div> There appears to be nothing here. </div>
		
		} else if(this.state.userPosition) {
				var rows = this.props.collection.models.map(function(model){
					if(!_this.insideRadius(model.get("position"), radiusFilter)){
						return;
					}
					return <SimpleListUnorderedCellView model={model} key={model.id} />
				});

		} else {
			var rows = <div>Could not get position</div>
		}
		this.setState({
			rows: rows
		});
	},

	getUserPosition: function(position){
		var _this = this;

		var userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		this.setState({
			userPosition: userPosition
		});
		this.setRows(this.props.radiusFilter);


	},	



	componentDidMount: function(){
		navigator.geolocation.getCurrentPosition(this.getUserPosition);

	},



	componentWillReceiveProps: function(nextProps){
		this.setRows(nextProps.radiusFilter)
	},


	render: function(){

		return (
			<div className="list-group">
				{this.state.rows ? this.state.rows : <LoadingView/>}
			</div>
		)
	}
});

module.exports = SimpleListView;