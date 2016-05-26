var React = require("react");
var Link = require("react-router").Link;
var IndexLink = require("react-router").IndexLink;

var UserModel = require("../../models/UserModel.js");


// The HeaderView is the top-component of the webapp
// It wraps the rest of the site in a <section> with the help of the React-router
// (this.props.children is from the Router in main.js)
var HeaderView = React.createClass({
	

	getInitialState: function() {
		UserModel.on("all", function(){
			this.forceUpdate();
		}, this);
		
		return {
			user: UserModel,
			active: false
		}
		
	},

	// Toggles the "checkbox" (menu button)
	// Used for when clicking links, the menu should close.
	handleToggle: function(){
		this.setState({
			active: !this.state.active
		});
	},


	// Renders the menu, menu-button and logo.
	// The menu is a fixed div behind the main-page.
	// The menu-button is a fixed modified checkbox that toggles the mainpage, menubutton and logos left value.
	// So the button moves everything to the right which shows the menu. Everything is made with CSS.
	// The "checkbox" is also modified by a react-state so it can close when clicking on links
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
