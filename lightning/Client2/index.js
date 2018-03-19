Server.prototype.s = function(to,c,val) {
    if(commands[c]) server.send(to,commands[c].build(val));
}

Server.onauth(function(user) {
    if(!user) {
        location.href = "login.html";
    }
});

var server = new Server({type:"client2",permission:true});

server.ondisconnect = function() {
    Command_Presence.innerHTML = "";
}

server.onreceive = function(snapshot) {
    if(commands[snapshot.val().Data.Command]) commands[snapshot.val().Data.Command].receive(snapshot);
}
server.onreceiveError = function(snapshot) {
    if(snapshot.val().Data.data != "<code style='color:red;'>ha you idiot upgrade</code>") {
        server.s(snapshot.val().From,"log",["<code style='color:red;'>ha you idiot upgrade</code>",true]);
    }
}

server.onpresence_removed = function(snapshot) {
    var UserElement = document.querySelector("[data-id='" + snapshot.val().id + "']");
    UserElement.parentNode.removeChild(UserElement);
};

server.onpresence_added = function(snapshot) {
    Command_Presence.innerHTML 
        += "<div data-id='" + snapshot.val().id + "' data-email='" + snapshot.val().email + "' data-type='" + snapshot.val().type + "'>"
        + snapshot.val().id + " - "
        + snapshot.val().email + " - "
        + snapshot.val().type
        + "</div>";
};

window.clicks = 0;
window.addEventListener("click",function(e) {
    window.clicks++;
    console.log(window.clicks);
    setTimeout(function() {if(window.clicks != 0) window.clicks--;},800);
    if(window.clicks === 1) {
        if(e.target.getAttribute("data-id")) {
            Command_Id.value = e.target.getAttribute("data-id");
        }
    }
    if(window.clicks === 2) {
        if(e.target.getAttribute("data-email")) {
            Command_Id.value = e.target.getAttribute("data-email");
        }
    }
    if(window.clicks === 3) {
        if(e.target.getAttribute("data-type")) {
            Command_Id.value = e.target.getAttribute("data-type");
        }
        window.clicks = 0;
    }
});

server.connect();

window.ononline = function() {
    server.reconnect();
};

window.addEventListener("error",function(e) {
    server.s("all","log",["<code style='color:red;'>" 
                          + e.message + " at " 
                          + e.filename + ":" 
                          + e.lineno + ":" 
                          + e.colno 
                          + "</code>",true]);
});

(function() {
    var key;
    for (key in commands) {
        if (commands.hasOwnProperty(key)) {
            var option = document.createElement("option");
            option.text = key;
            option.value = key;
            document.getElementById("command").add(option);
        }
    }
    commands[Command.value].click();
})();

Command.onchange = function() {
    if(commands[Command.value]) commands[Command.value].click();
};

Command_Button.onclick = function() {
  if(commands[Command.value]) commands[Command.value].submit();
}

window.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.keyCode == 83) { 
        e.preventDefault();
        Command_Button.click();
    }
    if (e.ctrlKey && e.keyCode == 81) { 
        e.preventDefault();
        window.setTimeout(function() {
            Command_Id.focus();
        },0);
    }
}, false);
