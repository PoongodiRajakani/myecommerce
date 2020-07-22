
var express=require('express');
var router=express.Router();
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
//var usermodel=require('../models/usermodel.js');
var usermodel=require('../models/productmodel.js');
var usermodel1=require('../models/maingroupmodel.js');
var sessions=require('express-session');
var multer=require('multer');
var fs=require('fs');
var util = require('util');
var uploadImage=[];
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/image/');
  },
  filename: function (req, file, callback) {
  		var ext='';
  	var name='';
  	if(file.originalname){
  		var p=file.originalname.lastIndexOf('.');
  		ext=file.originalname.substring(p+1);
  		var firstname=file.originalname.substring(0,p+1);
  		name=Date.now()+'_'+firstname;
  		name+=ext;
  	}
  uploadImage=[];
  uploadImage.push({'name': name});

    callback(null, name);
  }

});
var upload = multer({ storage: storage,
	limits:{filesize:10} }).array('image');

//exports.upload = upload;
//var uploadFilesMiddleware = util.promisify(upload);
//module.exports = upload;
exports.add = function(req, res) {

	upload(req,res,function(err){

console.log('err:',err);
		if(!err){
					console.log('req.files : ',req.files);
			console.log('req.body : ',req.body);
	var upldimg=uploadImage[0].name;
	const grp={
		maingroup:req.body.maingroup
	};
	 console.log(grp);
	usermodel1.findOne(grp, function(err,result){

     console.log('result:',result);
	const mydata={
		product: req.body.product,
		price: req.body.price,
		discount: req.body.discount,
		maingroup:req.body.maingroup,
		maingroupid:result.id,
	 image:upldimg
	
	};
	var data=usermodel(mydata);
	data.save(function(err){
		var resJson = {};
		if(err){
			resJson.resType = 'Error';
			resJson.resMsg = 'Error occured, please try again.';
			resJson.err = err;
			// res.render('loginpage',{message:"error"});
		} else {
var pro={
	product:req.body.product
};
 console.log(pro);
	usermodel.findOne(pro).populate("maingroupid")
    .exec(function(err, dic){
    	console.log("populate:",dic);
    });

			resJson.resType = 'Success';
			resJson.resMsg = 'Register succes.';

			// res.render('loginpage',{message:"successful"});
		}
		res.json(resJson);
	});
	});
}

});
}

