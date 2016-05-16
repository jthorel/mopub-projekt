var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;
var _ = require("underscore");

//------------------------------------//
//--------- EXPORTS A SINGLETON ------//
//------------------------------------//

var UserModel = Backbone.Model.extend({

	idAttribute: "_id",

	url: "api/user",

	initialize: function(){
		this.fetchStatus();
	},

	isAuthorized: function(){
		if(this.has("_id")){
			return true;
		} else {
			return false
		}
	},

	fetchStatus: function() {
		var _this = this;

		Backbone.sync("GET", this, {
			success: function(data){
				_this.set(data);

			}
		} )
	},

	logout: function(options) {
		var _this = this;
		Backbone.sync("delete", this, {
			success: function(){
				_this.clear();
				options.success();
			},
			error: function(){
				console.log("asd");
				_this.clear();
				options.success();
			}
		})
		
	}
})

module.exports = new UserModel();