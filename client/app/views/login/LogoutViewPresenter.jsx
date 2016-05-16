var React = require("react");

//STORES
var userModel = require("../../models/UserModel.js");

//VIEWS
var LoadingView = require("../misc/LoadingView.jsx");
var LogoutView = React.createClass({
	
	contextTypes: {
		router: React.PropTypes.object
	},

	componentDidMount: function() {
		var _this = this;
		console.log(this.context);
		userModel.logout({
            success: function() {
                _this.context.router.push("/");
            }
        });
	},

	render: function() {
		return <LoadingView />
	}

});

module.exports = LogoutView;