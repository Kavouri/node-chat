var http = require("http");
var io = require('socket.io')();
var url = require("url");
var fs = require("fs");
var currentUsers = [];
var resourceToFunction = {};

var server = http.createServer(function(req, resp) {
    if (req.url == "/new.html") {
      var read = fs.createReadStream(__dirname + req.url);
      read.pipe(resp);
      resp.writeHead(200, {"Content-Type": "text/html"});
    } else if (req.url == "/style.css" || req.url == "/client.js") {
      resp.writeHead(200, {"Content-Type":  
		req.url == '/style.css' ? 'text/css' : 'application/javascript'}); 
      fs.createReadStream(__dirname + req.url).pipe(resp);
    }    
});

io.sockets.on("connection", function(socket) {
    console.log("connected: " + socket.handshake.query.username);
    console.log(socket.handshake.query.username);
    currentUsers.push(socket.handshake.query.username);
    socket.on('newMessage', function(msg) {
        io.emit('newMessage', msg);
    });
});

server.listen(8000);
io.listen(server);
