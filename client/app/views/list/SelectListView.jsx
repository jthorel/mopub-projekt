var React = require("react");
var backboneMixin = require('backbone-react-component');

//STORES:
var TrackStore = require("../../stores/TrackStore.js");

//VIEWS:
var SelectListCellView = require("./cell/SelectListCellView.jsx");

var SelectListView = React.createClass({

	mixins: [backboneMixin],
	
	propTypes: {
		collection: React.PropTypes.object.isRequired //A Backbone-Collection of tracks. Sitting on TracklistModel.tracks
	},
	
	getInitialState: function() {
		return {
			trackCollection: TrackStore.getAll(),
			filterString: ""
		}
	},

	render: function(){
		var _this = this;
		
		var regExp = new RegExp(this.state.filterString, "i");

		var rows = this.state.trackCollection.models.map(function(model){
			
			if(_this.props.collection.findWhere({_id: model.get("_id")})) return; //If the track is allready in the tracklist.
			if ( !regExp.test(model.get("title")) ) return; //Make sure the title contains the searchstring.
			return <SelectListCellView model={model} key={model.id} collection={_this.props.collection}/>
		})

		return(
			<div className="list-group">
				<input 
					onChange={this.handleFilterChange} 
					value={this.state.filterString} 
					type="text" 
					className="form-control" 
					placeholder="Search for an existing track" />
				{rows}
			</div>
		)
	},
	
	handleFilterChange: function(e){
		this.setState({
			filterString: e.target.value
		});
	}


});

module.exports = SelectListView;