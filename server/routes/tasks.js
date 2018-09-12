var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://subha1:subha106@ds111124.mlab.com:11124/mytasklist_subha', ['tasks']);

// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// require('./server.js')(io);

// Get All tasks
router.get('/tasks', function(req, res, next) {
    //res.send("Tasks");
    db.tasks.find(function(err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

// Get single task
router.get('/task/:id', function(req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

// // Save task
router.post('/task', function(req, res, next) {
    var task = req.body;
    if (!task.title || !(task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function(err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });

    }
    //io.sockets.in(req.body.socketId).emit('someevent', req.body);
    // res.sendStatus(200);
});

// Delete Task
router.delete('/task/:id', function(req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

// update task
router.put('/task/:id', function(req, res, next) {
    var task = req.body;
    var updTask = {};

    if (task.isDone) {
        updTask.isDone = task.isDone;
    }
    if (task.title) {
        updTask.title = task.title;
    }
    if (!updTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updTask, {}, function(err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }


});

module.exports = router;
// module.exports = function(io) {
//     io.on('connection', function(socket) {
//         console.log('Made socket connection');
//         socket.on('addTask', function(data) {
//             console.log('data ', data);
//         })
//         socket.on('message', function(message) {
//             logger.log('info', message.value);
//             socket.emit('ditConsumer', message.value);
//             console.log('from console', message.value);
//         });
//     });
// };