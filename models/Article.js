var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ArticleSchema object
var ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: false,
    unique: true
  },
  byline: {
    type: String,
    required: false
  },
  // This only saves one comments's ObjectId, ref refers to the Comment model
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
