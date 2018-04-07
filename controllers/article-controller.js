var modelArticle = require("../models/Article.js");

module.exports = function(app) {

	app.get("/articles", function(req, res) {
		// console.log(".......Dipsplay articles....")
  	// Grab every document in the Articles collection
	  modelArticle.find({})
	    .then(function(articles) {
	    // console.log("Articles", articles);
	      res.render('index', {articles : articles});
	    })
	    .catch(function(err) {
	      res.json(err);
	    });
	});


}