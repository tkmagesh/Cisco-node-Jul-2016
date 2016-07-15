var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res){
	if (req.urlData.pathname === '/calculator' && req.method === 'GET'){
		var data = querystring.parse(req.urlData.query);
		var result = calculator[data.op](parseInt(data.n1,10), parseInt(data.n2,10));
		res.write(result.toString());
		res.end();
	} else if (req.urlData.pathname === '/calculator' && req.method === 'POST'){
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
	}
}