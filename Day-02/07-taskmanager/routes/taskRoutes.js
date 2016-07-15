var express = require('express');
var router = express.Router();

var taskList = [
	{id : 1, name : 'Fix the bug', isCompleted : false},
	{id : 2, name : 'Play Pokemon Go', isCompleted : true},
	{id : 3, name : 'Explore Node.js', isCompleted : true},
]
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('tasks/index', {list : taskList});
});

router.get('/new', function(req, res, next){
	res.render('tasks/new');
});

router.post('/new', function(req, res, next){
	var taskName = req.body.txtTask;
	var newId = taskList.reduce(function(result, task){
		return result > task.id ? result : task.id;
	},0) + 1;
	var newTask = {
		id : newId,
		name : taskName,
		isCompleted : false
	};
	taskList.push(newTask);
	res.redirect('/tasks');
});

router.get('/toggle/:id', function(req, res, next){
	var taskId = parseInt(req.params.id,10);
	var task = taskList.filter(function(t){
		return t.id === taskId;
	})[0];
	if (task)
		task.isCompleted = !task.isCompleted;
	res.redirect('/tasks');
});

router.get('/api/list', function(req, res, next){
	res.json({ tasks : taskList});
});
module.exports = router;