let Movie = require("mongoose").model("Movie");

class MovieController {

	all(req, res) {    //Find all Movies
		Movie.find({}).populate("_reviews").exec((err, Movies_found)=>{
			if (err){
				return res.json(err);
			}else{
				console.log("Found all movies");
				return res.json(Movies_found);
			}
		});
	}

	newMovie(req, res) {   //Create new Movie entry into DB
		Movie.find({title:req.body.title},(err, Movies_found)=>{
			if (Movies_found.length>0){
				return res.json({errors:{message:"A Movie with that title is already listed, feel free to leave a review!"}});
			}else{
				let new_Movie = new Movie(req.body);
				new_Movie.save((err)=>{
					if (err){
						return res.json(err);
					}else{
						console.log("New movie saved");
						return res.json(new_Movie);
					}
				});
			}
		});
	}

	findMovie(req, res) {   //Find individual Movies by ID
		Movie.findOne({_id:req.params.id}).populate("_reviews").exec((err, Movie_found)=>{
			if (err){
				return res.json(err);
			}else{
				console.log("Found one movie");
				return res.json(Movie_found);
			}
		});	
	}

	updateMovie(req, res) { //Edits individual Movies by ID
		Movie.findOne({_id:req.params.id}, (err, Movie_found)=>{
			if (err){
				return res.json(err);
			}else{
				Movie.find({title:req.body.title}, (err, duplicates)=>{
					for (let x=0; x<duplicates.length;x++){
						if (duplicates[x]._id==req.params.id){
							duplicates.splice(x,1);
						}
					}
					if (err){
						return res.json(err);
					}else if (duplicates.length>0){
						return res.json({errors:{message:"A Movie with this title already exists, feel free to leave a review!"}});
					}else{
						Movie.update({_id:Movie_found._id}, {$set:req.body}, {runValidators: true}, (err, update_info)=>{
							if(err){
								return res.json(err);
							}else{
								Movie.findOne({_id:Movie_found._id}, (err, updated_pet)=>{
									if (err){
										return res.json({errors:{message:"Oops, we were unable to retrieve your newly updated Movie"}});
									}else{
										console.log("Movie updated");
										return res.json(updated_pet);
									}
								});
							}
						});
					}
				});
			}
		});
	}

	removeMovie(req, res) { 
	console.log(req.params.id);  //Remove individual Movie by ID
		Movie.findOne({_id:req.params.id}).populate("_reviews").exec((err, Movie_found)=>{
			if (err){
				return res.json({errors:err});
			}else{
				for (let x=0; x<Movie_found._reviews.length; x++){
					Movie_found._reviews[x].remove({}, (err)=>{
						if (err){
							return res.json(err);
						}
					});
				}
				console.log("Removed reviews")
				Movie.remove({_id:req.params.id}, (err)=>{
					if (err){
						return res.json(err);
					}else{
						console.log("Removed movie");
						return res.json(Movie_found);
					}
				});
			}
		});
	}
}
module.exports = new MovieController();