let mongoose = require("mongoose");  //Includes mongoose
let fs = require("fs");  //Includes File System to parse through model files
let path = require("path");  //Includes path to point to model folder
let models = path.join(__dirname, "../models");  //Points to model folder

mongoose.connect("mongodb://localhost/squishy_tomatoes"); //Connects to database, or creates one if it doesn't exist

fs.readdirSync(models).forEach((file)=>{  //Loops through all files in our models folder, and includes each in turn
	if (file.indexOf(".js")>=0){
		require(models + "/" + file);
	}
});