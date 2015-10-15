var username;
var socket;
var connected = false;
var lastGrey = false; //Used to alternate color of messages;

function connect(text) {
    console.log(text);
    text = text.split(" ");
    if (text[0] != "connect" || text.length < 2) {
	addMessage("ERROR", "To connect, type 'connect' followed by a username");
        return;
    }
    username = text.slice(1).join(' ');
    console.log(text + "\t" + username);
    socket = io.connect({query: "username=" + username});
    connected = true;
    socket.on("newMessage", function(data) {
    addMessage(data.username, data.message);
    });
}

function addMessage(username, message) {
    var li = $("<li></li>",
		{"class": "message",
		 "style": "background-color:" + (lastGrey ? "white" : "#eee") + ";list-style-type:none;",
    		 "text": username + ": " + message});
    $("#list").append(li);
    lastGrey = !lastGrey;
    $('input[name=messageText]').val("");
}
    
$(document).ready(function() {
    $('button[name=sendMessage]').click(function(e) {
	if (!connected) {
	    console.log("connecting");
	    connect($("input[name=messageText]").val());
	    console.log("text: " + $("input[name=messageText]").val());
	    console.log("done connecting");
	    socket.emit('newMessage', {'username': "Server", 'message': "User " + username +
		" has connected."});
        } else {
	      socket.emit('newMessage', 
	          {'username': username, 'message': $('input[name=messageText]').val()});  
	}
	return false;
    });
});


