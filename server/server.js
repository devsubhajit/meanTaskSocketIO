var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var socket = require('socket.io');

var index = require('./routes/index');
var tasks = require('./routes/tasks');



//var port = 3000;
var app = express();


// View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, '../frontend'));
app.use(express.static(path.resolve(__dirname, "www")));
// app.use(function(req, res, next) {
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
// app.use(express.static(path.join(__dirname, '../frontend')));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route 

app.use('/', index);
app.use('/api', tasks);

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    console.log("listening to Port", app.get("port"));
});


// Socket Setup
var io = socket(server);
// require('./routes/tasks.js')(io);

io.on('connection', function(socket) {
    console.log('Made socket connection');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('addTask', function(data) {
        console.log('data ', data);
        // io.sockets.emit('newtask', { task: data.title });
        io.sockets.emit('newtask');
    });
    // Save task
});




// app.listen(port, function() {
//     console.log('Server started on port' + port);
// });
/*
var app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);

app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});
server.listen(80);
 */
// app.post('/event', function(req, res) {
//   io.sockets.in(req.body.socketId).emit('someevent', req.body);
//   res.sendStatus(200);
// });https://stackoverflow.com/questions/37870801/socket-io-fails-to-emit-in-express-app-post-callback