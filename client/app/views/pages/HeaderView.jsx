var React = require("react");
var backboneMixin = require('backbone-react-component');
var Link = require("react-router").Link;
var IndexLink = require("react-router").IndexLink;

var UserModel = require("../../models/UserModel.js");

var HeaderView = React.createClass({
	
	mixins: [backboneMixin],
	
	getInitialState: function() {
		UserModel.on("all", function(){
			this.forceUpdate();
		}, this);
		
		return {
			user: UserModel
		}
		
	},


	render: function() {
		var user = this.state.user

		if(user.isAuthorized()){
			var toggleLogin = <li><Link to="/logout" activeClassName="active"> Log out </Link></li>;
		} else {
			var toggleLogin = <li><Link to="/login" activeClassName="active"> Log in </Link></li>;
		}

		return (
			<section className="container">
				
				<section className="row">
					<nav className="navbar navbar-default">
						<div className="container-fluid">
							<div className="navbar-header">
								<a href="#" className="navbar-left"><img src="./img/logo3.png" width="90px" height="41px"/></a>
							</div>

							<ul className="nav navbar-nav navbar-left"> 
								<li><IndexLink to="/" activeClassName="active"> Latest Tracklists </IndexLink></li>
								<li><IndexLink to="/tracks" activeClassName="active"> Latest Tracks </IndexLink></li>
								{user.isAuthorized() && <li><Link to="/add/tracklist" activeClassName="active"> Add New Tracklist </Link></li>}
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li>
									{user.isAuthorized() && 
										<p className="navbar-text">
											Logged in as: <i>{user.get("username")}</i> 
										</p>
									}
								</li>
								{toggleLogin}
							</ul>
						</div>

					</nav>
				</section>

				<section className="row">
					{this.props.children}
				</section>
			</section>
		);
	}

});

module.exports = HeaderView;
