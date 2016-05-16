var React = require("react");
var backboneMixin = require('backbone-react-component');

//VIEWS:
var EditInfoCellView = require("../info/EditInfoCellView.jsx");
var LoginInputView = require("../login/LoginInputView.jsx");

var LoginFormView = React.createClass({

	mixins: [backboneMixin], //Updates this.state.error if model triggers an error.

	propTypes: {
		model: React.PropTypes.object.isRequired, //Backbone.Model: UserModel
		submitHandler: React.PropTypes.func.isRequired //Function to be called with the collected userdata and the action-type.
	},

	getInitialState: function() {
		return {
			action: "login", // "login" or "create"
			error: false
		}
	},

	render: function(){ 
		
		var isStateLogin = this.state.action === "login" ? true : false; //Boolean value. True if this.state.action === "login". Used for rendering

		var error = this.state.error ? true : false; //Error is set by backboneMixin to the error-object. If there is an object, transform it to true.

		return(		
    		<form className="panel panel-default" ref="form" onSubmit={this.submit}>
    		
    			<div className="panel-body">
    				<h2 className="text-center"> Welcome </h2>
    				<h2 className="text-center"><small>{isStateLogin ? "Please log in to be able to contribute." : "Please create an account to be able to contribute." }</small></h2>
    			</div>

				<div className="panel-body form-horizontal">
					<LoginInputView title={"Username"} type={"text"} name={"username"} error={error}/>
					<LoginInputView title={"Password"} type={"password"} name={"password"} error={error}/>
					{!isStateLogin && <LoginInputView title={"Email"} type={"email"} name={"email"} error={error} />}
					<input type="submit" className="btn btn-success pull-right" value={isStateLogin ? "Log in" : "Create" }/>
				</div>

    			<div className="panel-body pull-right">
					
        			<a href="javascript:void(0)" onClick={this.toggleAction} width="50%">{isStateLogin ? "Create account" : "Back to login" }</a>
    			</div>
    		</form>
		)
	},

	//Toggles state.action between "login" and "create". Also resets state.error
	toggleAction: function(){
		this.setState({
			action: this.state.action === "login" ? "create" : "login",
			error: false
		});
	},

	submit: function(e){
		e.preventDefault()

		var formData = {
			username: this.refs.form["username"].value,
			password: this.refs.form["password"].value,
			email: this.refs.form["email"] ? this.refs.form["email"].value : "",
			action: this.state.action
		}

		this.props.submitHandler(formData);

	}
});

module.exports = LoginFormView;