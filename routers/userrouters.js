
var express=require('express');
var router=express.Router();

var usermodel=require('../models/usermodel.js');
var jwt = require('jsonwebtoken');

//var usermodel=require('../models/productmodel.js');
exports.register = function(req, res) {

	
					
			console.log('register : ',req.body);
	
	const mydata={
		email: req.body.email,
		password: req.body.password,
	 name:req.body.name,
	 empid: req.body.empid
	
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

	
			resJson.resType = 'Success';
			resJson.resMsg = 'Register succes.';
			
			// res.render('loginpage',{message:"successful"});
		}
		res.json(resJson);
	});
}
exports.login = function(req, res) {
	console.log('login : ',req.body);
	const mydata={

		email: req.body.email,
		password: req.body.password
	};
	
 req.checkBody('email').notEmpty().withMessage('email is required');
 req.checkBody('password').notEmpty().withMessage('password is required');
 const errors = req.validationErrors();

      if (errors) {
      console.log("insideerr"); 
   
			res.json({'status':'validation',message:errors});
      } 
      else {
      	console.log("insidefind"); 
	usermodel.findOne(mydata, function(err,result){
     var resJson = {};
     console.log('result:',result);
		if(err){
			resJson.resType = 'Error';
			resJson.resMsg = 'Error occured, please try again.';
			resJson.err = err;
			// res.render('loginpage',{message:"error"});
		} else if(result!=null) {
var token=jwt.sign({mydata}, 'my_secret_key', { expiresIn: '1h'}, {algorithm: "HS256"});
	console.log("token:",token);

	req.session.token=token;
	req.session.sessionkey = result.id;
	
	resJson.status='success';
			resJson.resType = 'Success';
			resJson.resMsg = 'login succes.';
			// res.render('loginpage',{message:"successful"});
		}else{
			 	console.log("empty");
			res.json({'status':'empty',message:"Invalied Input"});
		}
		res.json(resJson);
    });

}

}

if(process.env.NODE_ENV !== 'production') {
  process.once('uncaughtException', function(err) {
    console.error('FATAL: Uncaught exception.');
    console.error(err.stack||err);
    setTimeout(function(){
      process.exit(1);
    }, 100);
  });
}

