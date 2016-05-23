var React = require("react");
var backboneMixin = require('backbone-react-component');
var Link = require("react-router").Link;
var IndexLink = require("react-router").IndexLink;

var UserModel = require("../../models/UserModel.js");


var HeaderView = React.createClass({
	
	mixins: [backboneMixin],


	handleToggle: function(){
		this.setState({
			active: !this.state.active
		});
	},
	
	getInitialState: function() {
		UserModel.on("all", function(){
			this.forceUpdate();
		}, this);
		
		return {
			user: UserModel,
			active: false
		}
		
	},


	render: function() {
		var user = this.state.user

		if(user.isAuthorized()){
			var toggleLogin = <li className="nav-item">
								<Link to="/logout" 
									activeClassName="active"
									onClick={this.handleToggle}> 
									Log out 
								</Link>
								</li>;
		} else {
			var toggleLogin = <li className="nav-item"><Link to="/login" activeClassName="active" onClick={this.handleToggle}> Log in </Link></li>;
		}

		return (
			<div>
				<ul className="navigation">
				    <li className="nav-item">
				    	<IndexLink to="/" 
				    		onClick={this.handleToggle} 
				    		activeClassName="active">
				    			Find activities
				    	</IndexLink>
				    </li>

				    <li className="nav-item">
				    	<Link to="/map"
				    		onClick={this.handleToggle}>
				    			Map
				    	</Link>
				    </li>
					
					{user.isAuthorized() && <li className="nav-item">
						<Link to="/add/activity" 
							onClick={this.handleToggle} 
							activeClassName="active"> 
							Create activity 
						</Link>
						</li>}
					
					<li className="navbottom" >
						{user.isAuthorized() && 
							<p className="nav-text">
								<span className="glyphicon glyphicon-user" style={{padding: "0.5em"}}></span>
								<i>{user.get("username")}</i> 
							</p>
						}
					</li>
					{toggleLogin}
				</ul>



				<input type="checkbox" id="nav-trigger" checked={this.state.active} onChange={this.handleToggle} className="nav-trigger" />
				<label htmlFor="nav-trigger">&#9776;</label>
				<img src="/img/logo2.png" className="titlelogo"/>


				<section className="site-wrap">
					{this.props.children}
				</section>
			</div>


		);
	}

});

module.exports = HeaderView;
