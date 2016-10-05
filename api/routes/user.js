var User = require('../models/user');

module.exports = function(app,router){
	router.get('/',function(req,res){
		res.json({message:"Api at api started"});
	});

	router.get('/users',function(req,res){
			User.find({},function(err,users){
				if(err) console.log(err);
				else
					res.json(users);
			});
	});		
};

