var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;
var _ = require("underscore");

var ActivityCollection = require("../collections/ActivityCollection.js");
var UserCollection = require("../collections/UserCollection.js");

var ActivityModel = Backbone.Model.extend({

	idAttribute: "_id",

	defaults: {
		title: null,
		date: null,
		type: null,
	},

	urlRoot: "api/activity",

	initialize: function(){
		if(!this.users){
			this.users = new UserCollection();
		}

	},

	createdByUser: function() {
		var user = require("./UserModel.js");

		if(this.get("createdBy") === user.get("username")){
			return true;
		} else {
			return false;
		}
	},

	resetToBackup: function(){
		this.set(this._backupAttributes);
		this.users.reset(this._backupUsers);
	},

	parse: function(data){
		if(!this.users){
			this.users = new UserCollection();
		}

		if(data.users){
			var users = data.users.map(function(item){
				delete item.id;
				var user = _.extend(item, item.user);
				delete user.user;
				return user;
			});
			delete data.users;
			this._backupUsers = users;
			this.users.reset(users);
		}

		this._backupAttributes = _.clone(data);

		return data;
	},
	toJSON: function(options) {

		var userAttrs = this.users.toJSON().map(function(user){
			return {
				user: user._id,
			}
		});

		var attrs = JSON.parse(JSON.stringify(this.attributes)); //Make a deep-copy
		attrs.users = userAttrs;

		return attrs;

	}
});

module.exports = ActivityModel;