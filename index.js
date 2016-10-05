var express = require('express');
var app = express();
var router = express.Router();
var morgan = require('morgan');

app.use(morgan('dev'));

var port = process.env.PORT || 3000;
var middlewares = require('./api/middlewares/login')(app,router);
var routes = require('./api/routes')(app,router);

app.use('/api',router);

app.listen(port,function(){
	console.log('Magic happens at port'+port);	
});
