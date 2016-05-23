var mongoose = require("mongoose"), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var ActivitySchema = new Schema({
    title: {type: String, default: "DEFAULT"},
    date: {type: String, default: ""},
    position: [{type: Number, default: null},{type: Number, default: null}
    ],
    description: {type: String, default: ""},
    place: {type: String, default: ""},
    createdBy: {type: String, default: "DEFAULT"},
    type: {type: String, default: ""},
    users: [{
        user: {type: ObjectId, ref: "User"},
        _id: false
    }]}, 
    {
    toObject: {
        virtuals: false
    },
    toJSON: {
        virtuals: false
    }
});

module.exports = mongoose.model('Activity', ActivitySchema);
