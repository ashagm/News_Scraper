var modelArticle = require("../models/Article.js");
var modelComment = require("../models/Comment.js");

module.exports = function(app) {
	// Create a new comment
  app.post("/articles/:id", function (req, res) {
    // Create a new Comment and pass the req.body to the entry
    modelComment.create(req.body, function (error, commentDoc) {
      console.log(req.body);
        if (error) {
          console.log(error);
        } else {
          console.log("Comment model created ....", commentDoc)
          // Use the article id to find and update it's comment
          modelArticle.findOneAndUpdate({
            _id: req.params.id
          }, 
          {
            $push: {
              comment: commentDoc._id
            }
          }, 
          {
            new: true
          }).exec(function (err, doc) {
              // Log any errors
              if (err) {
                console.log(err);
              } else {
                // Or send the document to the browser
                console.log("After DOc..", doc);
                res.redirect('back');
              }
            });
        }
      });
  });

   // Grab an article by it's ObjectId
  app.get("/articles/:id", function (req, res) {
    modelArticle.findOne({"_id": req.params.id})
      .populate("comments")
      .exec(function (error, ArtComments) {
        if (error) {
          console.log(error// Otherwise, send the doc to the browser as a json object
          );
        } else {
          console.log("Comments made already: ", ArtComments);
          res.render("comments", {result: ArtComments});
        }
      });
  });


}