var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;

var ActivityModel = require("../models/ActivityModel.js");

var ActivityCollection = Backbone.Collection.extend({

	model: ActivityModel,

	url: "api/activity",

	initialize: function(){

	},

	parse: function(data){

		return data;
	}
});

module.exports = ActivityCollection;