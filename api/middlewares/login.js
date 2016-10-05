var jwt = require('jsonwebtoken');
var config = require('../../config/config');

module.exports = function(app,router){
	app.set('superSecret',config.secret);

	router.use(function(req,res,next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		if(token){
			jwt.verify(token,app.get('superSecret'),function(err,decoded){
				if(err){
					return res.json({success:false,message:'Failed to authenticate token'});
				}else{
					req.decoded = decoded;
					next();
				}
			});
		}	else{
			return res.status(403).json({
				success : false,
				message : 'No such Tokens'
			});
		}
	});


};
