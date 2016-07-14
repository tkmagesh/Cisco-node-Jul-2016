var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');

var calculator = require('./calculator');

var staticExtns = ['.html', '.js', '.css', '.ico', '.jpg', '.png', '.json', '.txt', '.xml'];

function isStatic(resource){
	var resExtn = path.extname(resource);
	return staticExtns.indexOf(resExtn) !== -1;
}

var server = http.createServer(function(req, res){
	console.log(req.url);
	var urlObj = url.parse(req.url);
	if (isStatic(urlObj.pathname)){
		var resourcePath = path.join(__dirname, urlObj.pathname)
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourcePath);
		stream.pipe(res);	
	} else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var data = querystring.parse(urlObj.query);
		var result = calculator[data.op](parseInt(data.n1,10), parseInt(data.n2,10));
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		var inputData = '';
		req.on('data', function(chunk){
			inputData += chunk;
		});
		req.on('end', function(){
			console.log('req body ->', inputData);
			var data = querystring.parse(inputData);
			var result = calculator[data.op](parseInt(data.n1,10), parseInt(data.n2,10));
			res.write(result.toString());
			res.end();
		})
	} else {
		res.statusCode = 404;
		res.end();
	}
	

});

server.listen(8080);


/*
staticServer.js (if block)
dataParser.js (everything 'parse')
calculatorHandler.js (call to calculator)
notFoundHandler.js (404)
*/
