var React = require("react");
var backboneMixin = require('backbone-react-component');

//VIEWS:
var InfoCellView = require("./InfoCellView.jsx");
var EditInfoCellView = require("./EditInfoCellView.jsx");
var DatePicker = require('react-bootstrap-datetimepicker');
var moment = require('moment');
var user = require("../../models/UserModel.js");


// INFOVIEW COMPONENT
// Show/edit info about an activity-model.
var InfoView = React.createClass({
	mixins: [backboneMixin],

	propTypes: {
		model: React.PropTypes.object.isRequired, //A Backbone-Model
		editing: React.PropTypes.bool.isRequired
	},


	getInitialState: function(){

		// Set initial value for the datepicker component
		var datevalue = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
		return {
			datevalue: datevalue
		}
	},


	handleDateChange: function(value){
		// Update state and run callback changing the model
		this.setState({
			datevalue: value
		});
		this.props.handleDateChange(value);
	},


	render: function(){ 

		

		var modelicon = "/img/"+this.props.model.get("type")+".png";

		if(this.props.editing){
			return(
				<div>
					<EditInfoCellView model={this.props.model} keyName={"title"} />
					<EditInfoCellView model={this.props.model} keyName={"description"}/>
					<EditInfoCellView model={this.props.model} keyName={"place"}/>
					
					<div className="form-group">
						<label>At what time</label>
						<DatePicker 
							dateTime={this.state.datevalue} 
							onChange={this.handleDateChange} 
							inputFormat="YYYY-MM-DD HH:mm"
							format='YYYY-MM-DDTHH:mm:ss.SSS'
							showToday={true}/>
					</div>

				</div>
				)
		} else {

			var date = moment(this.props.model.get("date")).format('dddd MMMM Do YYYY HH:mm');
			return (		
				<div className="panel-body">		
					<h3>
						{this.props.model.get("title")} <img src={modelicon} width="32" height="32"/>
					</h3>
					<h4>{date}</h4><br/>
					<label>Place:</label> {this.props.model.get("place")}<br/>
					<label>Description:</label> {this.props.model.get("description")}<br/>
					<label>Host:</label><span className="artist"> {this.props.model.get("createdBy")}</span>
				</div>
				);
		}
	}
});

module.exports = InfoView;