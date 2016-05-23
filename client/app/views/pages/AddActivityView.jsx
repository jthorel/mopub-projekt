var React = require("react");


//STORES:
var ActivityStore = require("../../stores/ActivityStore.js");
//VIEWS:
var ButtonGroupView = require("../misc/ButtonGroupView.jsx");
var InfoView = require("../info/InfoView.jsx");
var GoogleMap = require("../misc/GoogleMap.jsx");
var TypeSelector = require("../misc/TypeSelector.jsx")



module.exports = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			model: ActivityStore.getNew(),
			position: '',

		}
	},

	setPosition: function(position) {
		var gpos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		this.setState({
			position: [position.coords.latitude, position.coords.longitude]
		});
	},

	componentDidMount: function(){
		navigator.geolocation.getCurrentPosition(this.setPosition);
	},

	handleDrag: function(position) {
		this.setState({
			position: [position.lat(), position.lng()]
		});
	},

	handleType: function(type) {
		this.setState({
			type: type
		});
	},

	handleDateChange: function(value){
		this.state.model.set('date', value);
	},


	render: function(){ 

		var _this = this;

		return(
			<div>
				<div className="col-md-3" style={{borderRight: "1px solid"}}>	
					<h4>Create activity</h4>
					<TypeSelector handleType={this.handleType}/>
					<InfoView model={this.state.model} editing={true} handleDateChange={this.handleDateChange}/>

                    <div className="btn-group">
                        <a onClick={this.save} className="btn btn-success"> Save </a>
                    </div>
											
				</div>
				<div className="col-md-9">
                    <div style={{width:"100%", height:"100%"}}>
						<h4 className="text-center">Location:</h4>
                        {this.state.position && 
                        	<GoogleMap position={this.state.position} handleDrag={this.handleDrag}/>
                        }
                        
                    </div>
				</div>
			</div>
		)
	},


	save: function() {
		var _this = this;
		this.state.model.set('position', this.state.position);
		this.state.model.set('type', this.state.type);
		this.state.model.save().done(function(){
            _this.context.router.push("/activity/" + _this.state.model.get("_id"));
		})
	}
});