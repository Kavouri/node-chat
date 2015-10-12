$(document).ready(function() {
  var socket = io.connect({query: "username=" + username});
  var username;
  var submitted = false;

  function connect() {
      if (submitted) {
          return false;
      }
      username = $("input[name=username]").val();
      if (!username) {
          alert("Enter a username!");
          return false;
      }
      submitted = true;
    }
    socket.on("newMessage", function(data) {
      $('#chatBox').append("<div>" + data.username + "\t" + data.message + "</div>");
    });
    $("#connect").submit(function(e) {
            connect();
            return false;
    });
    $('#submitMessage').submit(function(e) {
          console.log("new message");
          socket.emit('newMessage', 
              {'username': username, 'message': $('input[name=message]').val()});  
          return false;
    });
});

