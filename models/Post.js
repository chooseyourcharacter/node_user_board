
var mongoose = require('mongoose');

// schema
var postSchema = mongoose.Schema({ // 1
  title:{type:String, required:[true,'Title is required!']}, // 1
  body:{type:String, required:[true,'Body is required!']},   // 1
  // user - board relationship
  author:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
  password: {type : String, require : true },
  createdAt:{type:Date, default:Date.now}, // 2
  updatedAt:{type:Date},
});



// model & export
var Post = mongoose.model('post', postSchema);
module.exports = Post;

