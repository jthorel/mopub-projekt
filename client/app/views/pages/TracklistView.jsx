var React = require("react");

//VIEWS:
var ButtonGroupView = require("../misc/ButtonGroupView.jsx");
var InfoView = require("../info/InfoView.jsx");

var SimpleListView = require("../list/SimpleListView.jsx");
var ArrangeListView = require("../list/ArrangeListView.jsx");

var AddTrackstoTracklistView = require("../misc/AddTrackstoTracklistView.jsx");


module.exports = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},
	propTypes: {
		model: React.PropTypes.object.isRequired //A Backbone-Model
	},

	getInitialState: function() {
		return {
			editing: false
		}
	},

	render: function(){ 

		var _this = this;
		var methods = {
			edit: this.edit,
			save: this.save,
			cancel: this.cancel,
			delete: this.delete
		};
		var model = this.props.model;

		return(
			<div>
				<div className="col-md-3" style={{borderRight: "1px solid"}}>	
					<InfoView model={model} editing={this.state.editing} />
					{this.props.model.createdByUser() && <ButtonGroupView methods={methods} editing={this.state.editing}/> }
											
				</div>
				<div className="col-md-9">
					<h4 className="text-center">Tracks</h4>
					{this.editing()}
				</div>
			</div>
		)
	},
	
	editing: function() {
		if(this.state.editing){
			return (
				<div>
					<ArrangeListView collection={this.props.model.tracks} />
					<br/><h4 className="text-center">Add tracks to tracklist:</h4>
					<AddTrackstoTracklistView collection={this.props.model.tracks}/>
				</div>
			)
		} else {
			return <SimpleListView collection={this.props.model.tracks} type="ordered" />
		}
	},

	edit: function() {
		this.setState({editing: true});

	},

	cancel: function () {
		this.props.model.resetToBackup();
		this.setState({
			editing: false
		});
	},
	save: function() {
		var _this = this;
		this.props.model.save().done(function(){
			_this.setState({
				editing: false
			});
		})
	},

	delete: function() {
		var _this = this;
		if (confirm("Delete " + this.props.model.get("title") + "?")) {
			this.props.model.destroy();
			this.context.router.push("/");
		}
	}
});