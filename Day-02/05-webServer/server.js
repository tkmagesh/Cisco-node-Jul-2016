var http = require('http');
var app = require('./app');

var dataParser = require('./dataParser');
var serveStatic = require('./serveStatic');
var calculatorHandler = require('./calculatorHandler');
var notFoundHandler = require('./notFoundHandler');

app.use(dataParser);
app.use(serveStatic);
app.use(calculatorHandler);
app.use(notFoundHandler);

http.createServer(app).listen(8080);
