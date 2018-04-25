let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var MovieSchema = new mongoose.Schema({
	title: {
		type:String,
		required:[true, "Movie title is required"],
		minlength:[3, "Movie title needs to be atleast 3 characters long"],
		maxlength:[255, "Movie title needs to be at most than 255 characters long"]
	},

	average_rating: {
		type:Number
	},
	
	_reviews: [{
		type:Schema.Types.ObjectId,
		ref:'Review'
	}]
	
}, {timestamps:true});


mongoose.model("Movie", MovieSchema);  //Instantiating