(function() {
    var nameInput = document.getElementById("nameInput");
    var messageInput = document.getElementById("messageInput");
    var messagesDiv = document.getElementById("messagesDiv");
    var RoomNameInput = document.getElementById("RoomNameInput");
    var messageError = document.getElementById("messageError");
    var messagePresence = document.getElementById("messagePresence");

    var chat;
    var chatroom;
    var url = new URL(location.href);
    if(!url.searchParams.get("room")) {
      RoomNameInput.value = "Lobby";
      chatroom = "Lobby";
      chat = firebase.database().ref("chat/Lobby");
    }
    else {
      RoomNameInput.value = url.searchParams.get("room");
      chatroom = url.searchParams.get("room");
      chat = firebase.database().ref("chat/" + url.searchParams.get("room"));
    }

    var Presence = database.ref("ChatPresence/" + chatroom);
    Presence.on("child_removed", function(snapshot) {
        var UserElement = document.querySelector("[data-id='" + snapshot.val().id + "']");
        UserElement.parentNode.removeChild(UserElement);
    });

    Presence.on("child_added", function(snapshot) {
        messagePresence.innerHTML 
            += "<div data-id='" + snapshot.val().id + "' data-email='" + snapshot.val().email + "' data-type='" + snapshot.val().type + "'>"
            + snapshot.val().id + " - "
            + snapshot.val().email
            + "</div>";
    });

    light.app.email().then(function(email) {
        This = {
            email:email,
            id:Math.floor(Math.random() * 90000) + 10000,
        };
        database.ref("ChatPresence/" + chatroom + "/" + This.id).onDisconnect().remove();
        database.ref("ChatPresence/" + chatroom+ "/" + This.id).set({id:This.id,email:This.email});
    });


    RoomNameInput.onkeypress = function(e) {
      if(e.key == "Enter") {
        url.searchParams.set("room",RoomNameInput.value);
        location.href = url.href;
      }
    }
    var spamnumber = 0;
    messageInput.onkeypress = function(e) {
      if(e.key == "Enter" && !messageInput.value.trim() == "" && !nameInput.value.trim() == "" && navigator.onLine) {
        if(spamnumber >= 3) {
          messageError.innerHTML = "<div style='color:red;' style='display:inline;'>Please do not spam the chat!</div>";
        }
        else {
          messageError.innerHTML = "";
          var name = nameInput.value.trim();
          var text = messageInput.value.trim();
          chat.push({name:name,text:text,date:Date()});
          spamnumber += 1;
          setTimeout(function() {spamnumber--},10000);
          messageInput.value = "";
        }
      }
    }

    chat.on("child_added",function(snapshot) {
       //new Audio('https://jayvir101.github.io/lightning-resources/beep.mp3').play();
        var datem = snapshot.val().date || "unknown";
        if(snapshot.val().name == "/admin") {
            var div = document.createElement("div");
            div.innerHTML = "<b>" + datem + "</b>" + " <em style='color:blue;'>(Owner) Jayvir</em> : <div style='display:inline;'>" + snapshot.val().text + "</div><br>";
            messagesDiv.prepend(div);
        }
        if(snapshot.val().name == "/jot") {
            var div = document.createElement("div");
            div.innerHTML = "<b>" + datem + "</b>" + " <em style='color:blue;'>(Owner) Harjot</em> : <div style='display:inline;'>" + snapshot.val().text + "</div><br>";
            messagesDiv.prepend(div);
        }
        else if(snapshot.val().name == "/server") {
            var div = document.createElement("div");
            div.innerHTML = " <div style='color:red;' style='display:inline;'>" + "<b>" + datem + "</b> " + snapshot.val().text + "</div>";
            messagesDiv.prepend(div);
        }
        else {
            var div = document.createElement("div");
            div.innerHTML = "<b>" + datem + "</b>" + " <em>" + snapshot.val().name + "</em> : <div style='display:inline;'>" + snapshot.val().text + "</div><br>";
            messagesDiv.prepend(div);
        }
    });
})();