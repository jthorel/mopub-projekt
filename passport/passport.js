var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var UserModel = require("../api/UserModel.js");

passport.use(new LocalStrategy(
	function(username, password, done) {
		UserModel.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (user.password !== password) {
				return done(null, false, { message: 'Incorrect password.' });
			}

			return done(null, user);
		});
	}
));


passport.serializeUser(function(user, done) {
	done(null, user._id);
});


passport.deserializeUser(function(_id, done) {
	UserModel.findById(_id, function(err, user) {
		done(err, user);
	});
});

module.exports = passport;