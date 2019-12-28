var mongoose = require('mongoose');


const userroleSchema = mongoose.Schema({
  username : {
    type:String,
    required:true
  },
  role:{
      type:String,
      required:true
  }
});


var Userrole = mongoose.model('userrole', userroleSchema);
module.exports = Userrole;
