var cheerio = require("cheerio");
var request = require("request");
var axios = require("axios");

var modelArticle = require("../models/Article.js");

module.exports = function(app) {

	app.get("/scrape" , function(req, res){

		axios.get("https://www.nytimes.com/")
		.then(function(response){
			var $ = cheerio.load(response.data);
			let counter = 0;
			$("h2.story-heading").each(function(i, headline){
				var result = {};			
				result.headline = $(this).children('a').text();
				result.link = $(this).children('a').attr('href');
				result.byline = $(this).siblings('p.byline').text();
				result.summary = $(this).siblings('p.summary').text();

				if(result.headline && result.link){
					// console.log("Creating Item......", counter++)
					// console.log("Item is......", result );

			      	modelArticle.create(result)
			        	.then(function(dbArticle) {
			          console.log("Created Articles", dbArticle);
			          res.send('Successful: scrape completed for ' + (counter) + 'articles');
			        }).catch(function(err) {
			           res.status('Error', err);
			        });
			    }
	    	});

		});
	});
}