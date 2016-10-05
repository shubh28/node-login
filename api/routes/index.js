module.exports = function(app,router){

	require('./signup')(app);
	require('./user')(app,router);
	require('./login')(app);
	
};