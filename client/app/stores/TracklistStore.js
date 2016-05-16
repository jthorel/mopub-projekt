var TracklistCollection = require("../collections/TracklistCollection.js");
var TracklistModel = require("../models/TracklistModel.js");

var TracklistStore =  function () {

	var tracklistCollection = new TracklistCollection();

	return {

		getAll: function(callback){

			tracklistCollection.fetch().done(function(){
				callback(null, tracklistCollection);
			})

		},

		getByID: function(id, callback){
			var data = tracklistCollection.get(id);
			if(!data){
				data = new TracklistModel({_id: id});
			}
			data.fetch().done(function(){
				callback(null, data);
			});

		},
		
		getNew: function(){
			return new TracklistModel();
		}
	}
}

module.exports = new TracklistStore();