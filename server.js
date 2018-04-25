let express = require("express");  //Express inclusion for routing
let bodyParser = require("body-parser");  //Body parser inclusion to read form data
let path = require("path"); //Path inclusion to point to Angular dist
let app = express();  //Instantiates express
let port = 8000;  //Sets port #

app.use(express.static("./client/dist"));   //Points to Angular dist
app.use(bodyParser.urlencoded({extended:true})); //Enables body parser
app.use(express.json());  //Tells express app to use json objects

require("./server/config/mongoose.js");   //Includes file where our models are exported to
require("./server/config/routes.js")(app);  //Includes file that routes back end

app.listen(port, ()=>{   //Starts server listening on port
	console.log("Server is listening on port " + port);
});