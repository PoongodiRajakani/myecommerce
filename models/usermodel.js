var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  email: {
  	type: String,
  	required: true,
  	index: { unique: true }
  },
  password:{
  	type: String,
  	required:true


  },
  name:{
  	type: String,
    required:true
       
  },
  empid:{
    type:String,
    required:true
  }
});

var usertbl = new mongoose.model('profiletables', user );
module.exports = usertbl;