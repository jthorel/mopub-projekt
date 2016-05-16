var mongoose = require("mongoose"), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var TracklistSchema = new Schema({
    title: {type: String, default: ""},
    artist: {type: String, default: ""},
    createdBy: {type: String, default: "DEFAULT"},
    genre: {type: String, default: ""},
    length: {type: String, default: ""},
	spotify: {type: String, default: ""},
	soundcloud: {type: String, default: ""},
	youtube: {type: String, default: ""},
    tracks: [{
        track: {type: ObjectId, ref: "Track"},
        startTime: {type: String},
        _id: false
    }]
}, {
    toObject: {
        virtuals: false
    },
    toJSON: {
        virtuals: false
    }
});
TracklistSchema.virtual("type").get(function(){ return "tracklist";});

module.exports = mongoose.model('Tracklist', TracklistSchema);
