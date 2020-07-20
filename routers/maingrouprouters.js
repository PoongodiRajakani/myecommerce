var express=require('express');
var router=express.Router();

var usermodel=require('../models/maingroupmodel.js');
exports.addmaingroup = function(req, res) {

	
					
			console.log('addmaingroup : ',req.body);
	
	const mydata={
		maingroup:req.body.maingroup
	
	};
	console.log(req.body.maingroup);
	var data=usermodel(mydata);
	data.save(function(err){
		var resJson = {};
		if(err){
			resJson.resType = 'Error';
			resJson.resMsg = 'Error occured, please try again.';
			resJson.err = err;
			// res.render('loginpage',{message:"error"});
		} else {

	
			resJson.resType = 'Success';
			resJson.resMsg = 'saved success';
			
			// res.render('loginpage',{message:"successful"});
		}
		res.json(resJson);
	});
}