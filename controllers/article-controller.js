var cheerio = require("cheerio");
var request = require("request");
var axios = require("axios");

var modelArticle = require("../models/Article.js");

module.exports = function(app) {

	app.get("/articles", function(req, res) {
		console.log(".......Dipsplay articles....")
  	// Grab every document in the Articles collection
	  modelArticle.find({})
	    .then(function(articles) {
	    	console.log("Articles", articles);
	    	var articleArr = [];
	    	articles.forEach(function(article){
	    		articleArr.push({
	    			headline: article.headline, 
	    			summary: article.summary,
	    			byline: article.byline,
	    			link: article.link
	    		});
	    	});

	    	// console.log(articleArr);
	    	// console.log(articleArr.length)
	      res.render('index', {articles : articleArr});
	    })
	    .catch(function(err) {
	      res.json(err);
	    });
	});


}