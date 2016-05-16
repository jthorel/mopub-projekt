var React = require("react");

//VIEWS:
var LoginFormView = require("../login/LoginFormView.jsx");

var userModel = require("../../models/UserModel.js");


module.exports = React.createClass({

	componentDidMount: function() {
		if(userModel.isAuthorized()){
			this.props.history.push("/");
		}
	},

	render: function(){ 

		return(		
        	<LoginFormView model={userModel} submitHandler={this.submitHandler} />
		)
	},

	submitHandler: function(formData){
		var _this = this;

        userModel.save(formData, {
			wait: true,
        	success: function(){
        		window.location.hash = "#/";
        	}
        });
	}
});