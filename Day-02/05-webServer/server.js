var http = require('http'),
	path = require('path'),
	app = require('./app'),
	dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler'),
	chalk = require('chalk');

app.use(dataParser);
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(calculatorHandler);
app.use(notFoundHandler);

http.createServer(app).listen(8080);
console.log(chalk.red('server listening on port ') + chalk.bgBlue.white('8080'));
