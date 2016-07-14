var http = require('http');

var server = http.createServer(function(req, res){
	console.log('a new connection is established - ', req.url);
	res.write('<h1>Welcome to node web server</h1>');
	res.end();
});

server.listen(8080);

/*
req.url
if exists
	read and send to the client
else 
	res.statusCode = 404;
	res.end()

*/
