var User = require('../models/user');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');

module.exports = function(app){
	
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());

	app.get('/',function(req,res){
		res.json({message: "Hello the API has started"});
	});

	app.post('/signup',function(req,res){
		
		var salt_work_factor = 10;
		var hash = bcrypt.hashSync(req.body.password,salt_work_factor);
		
		var user = new User({
			name : req.body.name,
			password : hash,
			admin : req.body.admin
		});
		user.save(function(err){
			if(err) res.send(err);
			else
				res.json({message:"User Successfully Created"});
		});
	});
	
};