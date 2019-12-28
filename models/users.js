var mongoose = require('mongoose');


const userlistSchema = mongoose.Schema({
  username : {
    type:String,
    required:true
  },
  role:{
      type:String,
      required:true
  },
  password:{
    type:String,
    required:true
  }

});


var Userlist = mongoose.model('users', userlistSchema);
module.exports = Userlist;
