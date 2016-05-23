var mongoose = require("mongoose"), Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    email: String
},
	{
	toObject: {
		virtuals: true
	}, 
	toJSON: {
		virtuals: true
	}
});

module.exports = mongoose.model('User', UserSchema);
