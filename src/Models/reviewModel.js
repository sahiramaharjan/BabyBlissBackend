const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment:{
    type:String,
    required:true,
  },
  date:{
    type:Date,
    default: Date.now
  }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;