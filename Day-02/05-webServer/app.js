var _middlewares = [];

function app(req, res){
	function exec(middlewares, req, res){
		var first = middlewares[0],
			rest = middlewares.slice(1),
			next = function(){
				exec(rest, req, res)
			};
		if (typeof first === 'function'){
			first(req, res, next);
		}
	}
	exec(_middlewares, req, res);
}

app.use = function(middleware){
	_middlewares.push(middleware);
};

module.exports = app;