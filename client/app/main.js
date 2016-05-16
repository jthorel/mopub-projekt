var React = require("react");
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var IndexRoute = require("react-router").IndexRoute;
var HashHistory = require("react-router").hashHistory;
var Route = require('react-router').Route;

var HeaderView = require("./views/pages/HeaderView.jsx");
var TracklistListView = require("./views/pages/TracklistListView.jsx");
var TracksListView = require("./views/pages/TracksListView.jsx");

var TracklistViewPresenter = require("./views/pages/TracklistViewPresenter.jsx");
var TrackViewPresenter = require("./views/pages/TrackViewPresenter.jsx");
var AddTracklistView = require("./views/pages/AddTracklistView.jsx");

var LoginViewPresenter = require("./views/login/LoginViewPresenter.jsx");
var LogoutViewPresenter = require("./views/login/LogoutViewPresenter.jsx");

ReactDOM.render(
	(
		<Router history={HashHistory} >
			<Route path="/" component={HeaderView}>
				<IndexRoute component={TracklistListView} />
				<Route path="/tracks" component={TracksListView} />
				<Route path="/tracklist/:id" component={TracklistViewPresenter} />
				<Route path="/track/:id" component={TrackViewPresenter} />
				
				<Route path="/add/tracklist" component={AddTracklistView} />

				<Route path="/login" component={LoginViewPresenter} />
				<Route path="/logout" component={LogoutViewPresenter} />
			</Route>
			
		</Router>
	),
document.getElementById("app"));