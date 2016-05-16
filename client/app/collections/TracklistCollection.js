var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;

var TracklistModel = require("../models/TracklistModel.js");

var TracklistCollection = Backbone.Collection.extend({

	model: TracklistModel,

	url: "api/tracklist",

	initialize: function(){

	},

	parse: function(data){
		console.log("Here i can parse the data:");
		console.log(data);

		return data;
	}
});

module.exports = TracklistCollection;