module.exports = function(req, res, next){
	console.log('[notFoundHandler]  invoked');
	res.statusCode = 404;
	res.end();
	next();
}