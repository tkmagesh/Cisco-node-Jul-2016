var path = require('path'),
	fs = require('fs');


var staticExtns = ['.html', '.js', '.css', '.ico', '.jpg', '.png', '.json', '.txt', '.xml'];

function isStatic(resource){
	var resExtn = path.extname(resource);
	return staticExtns.indexOf(resExtn) !== -1;
}
module.exports = function(req, res, next){

	if (isStatic(req.urlData.pathname)){
		var resourcePath = path.join(__dirname, req.urlData.pathname)
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	} else {
		next();
	}
}