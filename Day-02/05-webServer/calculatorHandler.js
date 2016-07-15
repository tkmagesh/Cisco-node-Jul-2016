var
	calculator = require('./calculator');

module.exports = function(req, res, next){
	if (req.urlData.pathname === '/calculator'){
		var data = req.method === 'GET' ? req.query : req.body;
		var result = calculator[data.op](parseInt(data.n1,10), parseInt(data.n2,10));
		res.write(result.toString());
		res.end();
	} else {
		next();
	}
}