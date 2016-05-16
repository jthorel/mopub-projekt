var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;
var _ = require("underscore");

//var TracklistCollection = require("../collections/TracklistCollection.js");

var TrackModel = Backbone.Model.extend({

	idAttribute: "_id",

	defaults: {
		title: null,
		artist: null,
		genre: null,
		length: null,
		spotify: null,
		soundcloud: null,
		youtube: null,
		type: "track"
	},

	urlRoot: "api/track",

	initialize: function(){
		console.log("Inited a TrackModel!");

		if(!this.tracklists){
			var TracklistCollection = require("../collections/TracklistCollection.js");
			this.tracklists = new TracklistCollection();
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
	},

	parse: function(data) {
		if(!this.tracklists){
			var TracklistCollection = require("../collections/TracklistCollection.js");
			this.tracklists = new TracklistCollection();
		}

		if(data.featuredIn){
			this.tracklists.reset(data.featuredIn);
			delete data.featuredIn;
		}
		this._backupAttributes = _.clone(data);
		return data;
	},

	validate: function(attrs) {
		console.log("Validating");
		console.log(attrs);

	}
})

module.exports = TrackModel;