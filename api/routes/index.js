
module.exports = function(app,router){
	var signup = require('./signup')(app);
	var user = require('./user')(router);
	var login = require('./login')(app);	
};