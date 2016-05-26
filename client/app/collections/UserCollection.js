var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $;

var UserModel = require("../models/UserModel.js");


// A COLLECTION OF USERS FOR LIST OF PARTICIPANTS
var UserCollection = Backbone.Collection.extend({


});

module.exports = UserCollection;