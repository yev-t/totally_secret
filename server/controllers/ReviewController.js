let Review = require("mongoose").model("Review");
let Movie = require("mongoose").model("Movie");

class ReviewController {

	all(req, res) {    //Find all reviews
		Review.find({_movie:req.params.id}, (err, reviews_found)=>{
			if (err){
				return res.json(err);
			}else{
				return res.json(reviews_found);
			}
		});
	}

	newReview(req, res) {   //Create new review entry into DB by Movie ID
		Movie.findOne({_id:req.params.id},(err, movie_found)=>{
			if (err){
				return res.json({errors:{message:"Oops, we were unable to find the Movie to review"}});
			}else{
				let new_review = new Review(req.body);
				new_review._movie = req.params.id;
				movie_found._reviews.push(new_review);
				movie_found.save((err)=>{
					if (err){
						return res.json(err);
					}else{
						new_review.save((err)=>{
							if (err){
								return res.json(err);
							}else{
								return res.json(new_review);
							}
						});	
					}
				});
			}
		});
	}

	deleteAllReviews(req,res) {
		Review.remove({},(err)=>{
			console.log("Deleted all reviews");
			return res.json("Delete succesfull");
		});
	}

	deleteOneReview(req,res) {
		Review.remove({_id:req.params.review_id},(err)=>{
			if(err){
				return res.json(err);
			}else{
				Movie.findOne({_id:req.params.id}, (err, movie_found)=>{
					for (let x=0; x<movie_found._reviews.length; x++){
						if(movie_found._reviews[x]._id == req.params.review_id){
							movie_found._reviews.splice(x,1);
							movie_found.save((err)=>{
								if(err){
									return res.json(err);
								}
								console.log("Deleted review from both ends");
							});
						}
					}
				});
			}
			console.log("Deleted one reviews");
			return res.json("Delete succesfull");
		});
	}

}
module.exports = new ReviewController();