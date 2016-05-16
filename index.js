var express = require("express");
var app = express();

app.use(express.static('client'));
//MONGOOSE
var mongoose = require("mongoose");
mongoose.set("debug", true);
var mongoURI = process.env.MONGODB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/TracklistDB";
mongoose.connect(mongoURI);

//BODYPARSING. Exposes req.body, where you can get params sent etc.
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//LOGGING. Like "GET /api/tracks. Returned 200"
var logger = require("morgan");
app.use(logger("dev"));

//SESSION
var session = require("express-session");
app.use(session({ secret: 'keyboard cat' }));

//PASSPORT:
var passport = require("./passport/passport.js");
app.use(passport.initialize());
app.use(passport.session());

//DELAY - Fakes real server-latency for all requests to points defined after this (API).
app.use(function(req, res, next){
	setTimeout(function(){
		next();
	}, 500);
})

//API Routes all the traffic to /api/ to the file ./api/Router.
var apiRouter = require("./api/Router");
app.use("/api", apiRouter);



//ERROR LOGGER If the request hasnt been answered yet, some error occured.
app.use(function(err, req, res, next) {
	console.log("This error hit the logger.");
	console.log(err);
	res.status(err.status || 1000);
	res.send(err.responseJSON || err);
});

//START the server
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
