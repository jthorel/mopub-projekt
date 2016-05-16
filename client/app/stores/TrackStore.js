var TrackCollection = require("../collections/TrackCollection.js");
var TrackModel = require("../models/TrackModel.js");

var TrackStore =  function () {

	var trackCollection = new TrackCollection();

	return {

		getAll: function(callback){

			trackCollection.fetch();
			return trackCollection;

		},

		getByID: function(id, callback){
			var data = trackCollection.get(id);
			if(!data){
				data = new TrackModel({_id: id});
			}
			data.fetch().done(function(){
				callback(null, data);
			});

		},

		search: function(filter){
			trackCollection.getByFilter(filter);
			return trackCollection;
		}
	}
}

module.exports = new TrackStore();