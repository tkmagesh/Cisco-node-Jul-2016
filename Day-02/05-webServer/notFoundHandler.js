module.exports = function(req, res){
	console.log('[notFoundHandler]  invoked');
	res.statusCode = 404;
	res.end();
}