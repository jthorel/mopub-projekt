var React = require("react");


//STORES:
var TracklistStore = require("../../stores/TracklistStore.js");
//VIEWS:
var ButtonGroupView = require("../misc/ButtonGroupView.jsx");
var InfoView = require("../info/InfoView.jsx");
var ArrangeListView = require("../list/ArrangeListView.jsx");

var AddTrackstoTracklistView = require("../misc/AddTrackstoTracklistView.jsx");


module.exports = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			model: TracklistStore.getNew()
		}
	},

	render: function(){ 

		var _this = this;

		return(
			<div>
				<div className="col-md-3" style={{borderRight: "1px solid"}}>	
					<InfoView model={this.state.model} editing={true} />
                    <div className="btn-group">
                        <a onClick={this.save} className="btn btn-success"> Save </a>
                    </div>
											
				</div>
				<div className="col-md-9">
					<h4 className="text-center">Tracks</h4>
                    <div>
                        <ArrangeListView collection={this.state.model.tracks} />
                        <br/><h4 className="text-center">Add tracks to tracklist:</h4>
                        <AddTrackstoTracklistView collection={this.state.model.tracks}/>
                    </div>
				</div>
			</div>
		)
	},

	save: function() {
		var _this = this;
		this.state.model.save().done(function(){
            _this.context.router.push("/tracklist/" + _this.state.model.get("_id"));
		})
	}
});