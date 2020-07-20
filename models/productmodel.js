var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
  product: {
  	type: String,
  	required: true
  	
  },
  image:{
  	type: String,
  	required:true


  },
  price:{
  	type: String,
    required:true
       
  },
  discount:{
    type:String
   
  },
  maingroup:{
    type:String,
    required:true
   
  },
  maingroupid:{
    type: Schema.Types.ObjectId,
     ref: 'maingrouptable'
  }
});

var itemtbl = new mongoose.model('producttables', item );
module.exports = itemtbl;