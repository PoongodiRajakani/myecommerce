var express = require('express');
var app = express();
var expressValidator = require('express-validator');
app.use(expressValidator());
var path = require('path');
var bodyParser=require('body-parser');
var sessions=require('express-session');
var router=express.Router();
app.use(bodyParser.urlencoded({extended : true}));
app.use(sessions({secret: "Its a secret!"}));
var jwt = require('jsonwebtoken');
app.use(bodyParser());
app.set('view engine', 'ejs');
const fs = require('fs')
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/ecommerce';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var request = require('request');
 var model=require('./models/usermodel.js');
 var usermodel=require('./models/productmodel.js');
 var usermodel1=require('./models/maingroupmodel.js');
var control=require('./routers/userrouters.js');
var control1=require('./routers/productrouters.js');
var control2=require('./routers/maingrouprouters.js');
app.route('/register').post(control.register);
app.route('/login').post(control.login);
app.route('/add').post(control1.add);
app.route('/addmaingroup').post(control2.addmaingroup);
app.get('/', function(req, res)
 {
res.render(path.join(__dirname + '/view/login.ejs'));
});
app.get('/login', function(req, res)
 {
res.render(path.join(__dirname + '/view/login.ejs'));
});
app.get('/logout', function(req, res)
 {
 	req.session.destroy();
res.render(path.join(__dirname + '/view/login.ejs'));
});
app.get('/home', function(req, res)
 {
res.render(path.join(__dirname + '/view/home.ejs'),{ errormessage: '' });
});
app.get('/loginpage', function(req, res)
 {
res.render(path.join(__dirname + '/view/login.ejs'));
});
app.get('/register', function(req, res)
 {
res.render(path.join(__dirname + '/view/register.ejs'));
});
app.get('/addlist', function(req, res)
 {
 	var token=req.session.token;
	console.log(token);
	if(!token) return res.render(path.join(__dirname + '/view/login.ejs'),{ errormessage: 'access denied' });
	try{
		const verified=jwt.verify(token,'my_secret_key');

		req.user=verified;
		var result;


	 	usermodel1.find({},function(err,result){

	res.render(path.join(__dirname + '/view/addlist.ejs'),{result:result});
});
	}catch{
	res.render(path.join(__dirname + '/view/home.ejs'),{ errormessage: 'Invalid Token' });
	}

});

app.get('/addgroup', function(req, res)
 {var result;
 	
var token=req.session.token;
	console.log(token);
	if(!token) return res.render(path.join(__dirname + '/view/login.ejs'),{ errormessage: 'access denied' });
	try{
		const verified=jwt.verify(token,'my_secret_key');

		req.user=verified;
	res.render(path.join(__dirname + '/view/addgroup.ejs'));
	}catch{
		res.render(path.join(__dirname + '/view/home.ejs'),{ errormessage: "Invalid Token" });
	}


});
 

app.get('/list', function(req, res)
 {var result;
 	usermodel.find({},function(err,result){
var token=req.session.token;
	console.log(token);
	if(!token) return res.render(path.join(__dirname + '/view/login.ejs'),{ errormessage: 'access denied' });
	try{
		const verified=jwt.verify(token,'my_secret_key');

		req.user=verified;
	res.render(path.join(__dirname + '/view/viewlist.ejs'),{result:result});
	}catch{
		res.render(path.join(__dirname + '/view/home.ejs'),{ errormessage: "Invalid Token" });
	}


});
 });
app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
});