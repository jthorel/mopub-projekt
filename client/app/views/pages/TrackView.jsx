var React = require("react");

//VIEWS:
var ButtonGroupView = require("../misc/ButtonGroupView.jsx");
var InfoView = require("../info/InfoView.jsx");
var SimpleListView = require("../list/SimpleListView.jsx");


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
			cancel: this.cancel
		};

		var model = this.props.model;

		return(		
    		<div>
	    		<div className="col-md-3" style={{borderRight: "1px solid"}}>
					<InfoView model={model} editing={this.state.editing} />
					{this.props.model.createdByUser() && <ButtonGroupView methods={methods} editing={this.state.editing}  /> }
				</div>
			
				<div className="col-md-9">	
					<h4> Appears in </h4>
					<SimpleListView collection={model.tracklists} type={"unordered"}/>
				</div>
			</div>  			
		)
	},

	edit: function() {
		this.setState({editing: true});
	},

	cancel: function () {
		if( this.props.model.isNew()){
			console.log("SHOULD BACK TO LATEST URL");
		} else {
			this.props.model.resetToBackup();
			this.setState({
				editing: false
			});
		}
		
	},

	save: function() {
		var _this = this;

		this.props.model.save().done(function(){
			console.log("Saved!");
			_this.setState({
				editing: false
			});
		})
	}
});