var mongoose = require("mongoose"), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var TrackSchema = new Schema({
    title: {type: String},
    artist: {type: String},
    genre: {type: String},
    length: String,
    createdBy: {type: String, default: "DEFAULT"},
	spotify: String,
	soundcloud: String,
	youtube: String
}, {
	toObject: {
		virtuals: true
	}, 
	toJSON: {
		virtuals: true
	}
});

TrackSchema.virtual("type").get(function(){ return "track" });
module.exports = mongoose.model('Track', TrackSchema);
