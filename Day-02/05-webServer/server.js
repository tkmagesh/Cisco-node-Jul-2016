var http = require('http');

var dataParser = require('./dataParser');
var serveStatic = require('./serveStatic');
var calculatorHandler = require('./calculatorHandler');
var notFoundHandler = require('./notFoundHandler');

var server = http.createServer(function(req, res){
	
	dataParser(req);
	serveStatic(req, res);
	calculatorHandler(req, res);
	notFoundHandler(req, res);
});

server.listen(8080);


/*
staticServer.js (if block)
dataParser.js (everything 'parse')
calculatorHandler.js (call to calculator)
notFoundHandler.js (404)
*/
