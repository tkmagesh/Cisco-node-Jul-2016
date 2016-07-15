var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	req.urlData = url.parse(req.url);
	req.query = querystring.parse(req.urlData.query);
	if (req.method === 'POST'){
		var inputData = '';
		req.on('data', function(chunk){
			inputData += chunk;
		});
		req.on('end', function(){
			req.body = querystring.parse(inputData);
			next();
		});
	} else {
		next();	
	}
	
}