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
		console.log('resource exits ' + resourcePath)
		var stream = fs.createReadStream(resourcePath);
		stream.on('open', function(){
			console.log('[serveStatic] opening resource for writing to the response');
		})
		stream.on('data', function(chunk){
			console.log('[serveStatic] serving one chunk of the resource');
			res.write(chunk);
		})	
		stream.on('end', function(chunk){
			console.log('[serveStatic] completed serving the resource');
			res.end();
		})	
	} else {
		next();
	}
}