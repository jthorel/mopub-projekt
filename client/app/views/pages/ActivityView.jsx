var React = require("react");

//VIEWS:
var ButtonGroupView = require("../misc/ButtonGroupView.jsx");
var InfoView = require("../info/InfoView.jsx");

var SimpleListView = require("../list/SimpleListView.jsx");
var UserList = require("../list/UserList.jsx");
var GoogleMap = require("../misc/GoogleMap.jsx");
var user = require("../../models/UserModel.js");
var ChatPage = require("./ChatPage.jsx");

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

	handleDateChange: function(value){
		this.props.model.set('date', value);
	},

	addUser: function(){
		this.props.model.users.add(user);
		this.props.model.save();
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

					<InfoView model={model} editing={this.state.editing} handleDateChange={this.handleDateChange}/>
					{this.props.model.createdByUser() ? <ButtonGroupView methods={methods} editing={this.state.editing}/>
					: user.isAuthorized() ? <button className="btn btn-success" onClick={this.addUser}>Join</button> : "" }
											
				</div>
				<div className="col-md-9">
					<h4>Participants </h4>
					{this.editing()}

					{user.isAuthorized() ? 
						<div>
							<h4>Chat</h4>
							<hr/>
							<ChatPage channel={model.get("_id")} name={user.get("username")}/>
						</div>
						: "" }
				</div>
			</div>
		)
	},


	
	editing: function() {
		if(this.state.editing){
			return (
				<div>
				</div>
			)
		} else {
			return <div style={{width:"100%", height:"100%"}}>
						<UserList collection={this.props.model.users}/>
						<GoogleMap position={this.props.model.get("position")} />
						
					</div>
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
		this.props.model.save()
		this.setState({
				editing: false
			});

	},

	delete: function() {
		var _this = this;
		if (confirm("Delete " + this.props.model.get("title") + "?")) {
			this.props.model.destroy();
			this.context.router.push("/");
		}
	}
});