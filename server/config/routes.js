let MovieController = require("../controllers/MovieController.js");  //Includes Pet Controller
let ReviewController = require("../controllers/ReviewController.js");  //Includes Pet Controller

let path = require("path");

module.exports=(app)=>{ //Routes

	/***************************************************************
			Back end (express) routes
	****************************************************************/

	app.get("/api/", MovieController.all);
	app.post("/api/", MovieController.newMovie);
	app.get("/api/:id", MovieController.findMovie);
	app.put("/api/:id", MovieController.updateMovie);
	app.delete("/api/:id", MovieController.removeMovie);
	app.get("/api/:id/review", ReviewController.all);
	app.post("/api/:id/review", ReviewController.newReview);
	app.delete("/api/:id/review", ReviewController.deleteAllReviews);
	app.delete("/api/:id/review/:review_id", ReviewController.deleteOneReview);

	/***************************************************************
		Redirect to front (angular) routes
	****************************************************************/

	app.all("*", (req, res, next)=>{
		res.sendFile(path.resolve("./client/dist/index.html"));
	});
}