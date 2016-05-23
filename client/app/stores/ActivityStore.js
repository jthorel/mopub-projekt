var ActivityCollection = require("../collections/ActivityCollection.js");
var ActivityModel = require("../models/ActivityModel.js");

var ActivityStore =  function () {

	var activityCollection = new ActivityCollection();

	return {

		getAll: function(callback){

			activityCollection.fetch().done(function(){
				callback(null, activityCollection);
			})

		},

		getByID: function(id, callback){
			var data = activityCollection.get(id);
			if(!data){
				data = new ActivityModel({_id: id});
			}
			data.fetch().done(function(){
				callback(null, data);
			});

		},
		
		getNew: function(){
			return new ActivityModel();
		}
	}
}

module.exports = new ActivityStore();