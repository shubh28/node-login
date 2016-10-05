var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

module.exports = function(app){
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());

	app.post('/authenticate',function(req,res){
		var salt_work_factor = 10;
		var hash = bcrypt.hashSync(req.body.password,salt_work_factor);
		User.findOne({
			name : req.body.name
		},function(err,user){
			if(err) throw err;

			if(!user){
				res.status(404).json({success:false,message:'Authentication failed. User not found'});
			}else if(user){
				if(bcrypt.compareSync(req.body.password, user.password)){
					var token = jwt.sign(user,app.get('superSecret'),{
						expiresIn : 24*60*60
					});

					res.json({
						succes : true,
						message : "Enjoy the token",
						token : token,
						name : user.name
					});
				}else{
					res.status(401).json({success:false,message: 'Authentication failed.Wrong Password'});
				}
			}
		});
	});
};