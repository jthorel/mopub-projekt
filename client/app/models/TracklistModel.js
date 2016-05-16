var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;
var _ = require("underscore");

var TrackCollection = require("../collections/TrackCollection.js");

var TracklistModel = Backbone.Model.extend({

	idAttribute: "_id",

	defaults: {
		title: null,
		artist: null,
		genre: null,
		spotify: null,
		soundcloud: null,
		youtube: null,
		type: "tracklist"
	},

	urlRoot: "api/tracklist",

	initialize: function(){
		if(!this.tracks){
			this.tracks = new TrackCollection();
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
		this.tracks.reset(this._backupTracks);
	},

	parse: function(data){
		if(!this.tracks){
			this.tracks = new TrackCollection();
		}

		if(data.tracks){
			var tracks = data.tracks.map(function(item){
				delete item.id;
				var track = _.extend(item, item.track);
				delete track.track;
				return track;
			});
			delete data.tracks;
			this._backupTracks = tracks;
			this.tracks.reset(tracks);
		}

		this._backupAttributes = _.clone(data);

		return data;
	},
	toJSON: function(options) {

		var tracksAttrs = this.tracks.toJSON().map(function(track){
			return {
				startTime: track.startTime || "00:00",
				track: track._id,

			}
		})

		var attrs = JSON.parse(JSON.stringify(this.attributes)); //Make a deep-copy
		attrs.tracks = tracksAttrs;

		console.log(attrs);
		return attrs;

	}
});

module.exports = TracklistModel;