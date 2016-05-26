var React = require("react");
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var IndexRoute = require("react-router").IndexRoute;
var HashHistory = require("react-router").hashHistory;
var Route = require('react-router').Route;

var HeaderView = require("./views/pages/HeaderView.jsx");
var ActivityListView = require("./views/pages/ActivityListView.jsx");

var ActivityViewPresenter = require("./views/pages/ActivityViewPresenter.jsx");

var AddActivityView = require("./views/pages/AddActivityView.jsx");

var LoginViewPresenter = require("./views/login/LoginViewPresenter.jsx");
var LogoutViewPresenter = require("./views/login/LogoutViewPresenter.jsx");
var MapView = require("./views/pages/MapView.jsx");
var ChatPage = require("./views/pages/ChatPage.jsx");

// Main
// A ReactRouter
// Routes to components from the URL
// HeaderView is the top component as it wraps the rest of the site.

ReactDOM.render(
	(
		<Router history={HashHistory} >
			<Route path="/" component={HeaderView}>
				<IndexRoute component={ActivityListView} />
				<Route path="/activity/:id" component={ActivityViewPresenter} />

				<Route path="/add/activity" component={AddActivityView} />
				<Route path="/map" component={MapView}/>

				<Route path="/login" component={LoginViewPresenter} />
				<Route path="/logout" component={LogoutViewPresenter} />
			</Route>
			
		</Router>
	),
document.getElementById("app"));