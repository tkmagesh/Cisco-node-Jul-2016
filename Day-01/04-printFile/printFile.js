var fs = require('fs');
/*
try{
	var fileContents = fs.readFileSync('./test1.txt', {encoding : 'utf8'});
	console.log(fileContents);
} catch (err){
	console.log('something went wrong ', err);
}*/

/*
fs.readFile('./test.txt', {encoding : 'utf8'}, function(err, fileContents){
	if (err){
		console.log('something went wrong', err);
		return;
	}
	console.log(fileContents);
	console.log("job done..");
});

*/


var stream = fs.createReadStream('./test.txt', {encoding : 'utf8'});
var readCount = 0;

/* open, data, end, close, error */

stream.on('data', function(chunk){
	++readCount;
	console.log(chunk);
});

stream.on('end', function(){
	console.log("job done.. with " + readCount + ' readCounts') ;
});

