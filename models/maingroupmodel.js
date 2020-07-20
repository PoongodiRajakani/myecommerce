var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
  maingroup: {
  	type: String,
  	required: true
  	
  },
  subgroupid:{
    type: Schema.Types.ObjectId,
     ref: 'producttables'
  }
});

var itemtbl = new mongoose.model('maingrouptable', item );
module.exports = itemtbl;