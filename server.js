var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");

var mongoose = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/newsscraper");

// var connectDB = mongoose.connection;
// connectDB.on('error', console.error.bind(console, 'connection error:'));
// connectDB.once('open', function() {
//   console.log("Connected to MongoDB db");
// });

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/newsscraper";

// Connect
mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Ready to serve! ");
  }
});

// Require all models
// var db = require("./models");

//Initialize Express/
var app = express();
var PORT = process.env.PORT || 3000;

//public static dir
app.use(express.static(__dirname + '/public'));

//handlebars
var hbs = exphbs.create({
	defaultLayout: "main",
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//use Morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


//routes
require("./controllers/scraper-controller.js")(app);
require("./controllers/article-controller.js")(app);


app.get("/", function(req,res){
	res.render("index");
})

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
