let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var ReviewSchema = new mongoose.Schema({
	name: {
		type:String,
		required:[true, "Your name is required"],
		minlength:[3, "Your name needs to be atleast 3 characters long"],
		maxlength:[255, "Your name needs to be at most than 255 characters long"]
	},
	star_rating: {
		type:Number,
		required:[true, "Star rating is required"],
		minl:[1, "Star rating needs to be between 1 and 5"],
		maxl:[5, "Star rating needs to be between 1 and 5"]
	},
	review: {
		type:String,
		required:[true, "Review is required"],
		minlength:[3, "Review needs to be atleast 3 characters long"],
		maxlength:[255, "Review needs to be at most than 255 characters long"]
	},
	_movie: {
		type:Schema.Types.ObjectId,
		ref:'Movie'
	}
	
}, {timestamps:true});


mongoose.model("Review", ReviewSchema);  //Instantiating