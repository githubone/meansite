var mongoose = require('mongoose');
var task = require('../models/task.js');

module.exports = TaskList;

function TaskList(connection){
    mongoose.connect(connection);
}

TaskList.prototype = {
    showTasks : function(req, res){
        task.find({itemComleted : false}, function foundTasks(err, items){
            res.render('index', {title: 'My TODO Lists', tasks: items})
        });
    },

    addTask : function(req, res){
        var item = req.body;
        var newTask = new task();
        newTask.itemName = item.itemName;
        newTask.itemCategory = item.itemCategory;
        newTask.save(function(err){
            if (err){
                throw err;
            }
        });
        res.redirect('/');
    },

    completeTask: function(req, res){
        var completedTasks = req.body;
        for(taskid in completedTasks){
            if (completedTasks[taskid] == 'true'){
                var conditions = {_id: taskid};
                var updates = {itemCompleted: completedTasks[taskid]};
                task.update(conditions, updates, function updated(err){
                    if (err){
                        throw err;
                    }
                });
            }
        }
        res.redirect('/');
    }
}

