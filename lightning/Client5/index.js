(function() {
    if (Notification.permission !== "granted") Notification.requestPermission();
})();
var Command_Presence = document.getElementById("command_presence");
var server = new Server({type:"client5",permission:true,email:"client5@jayvir101.github.io"});

Server.prototype.s = function(to,c,val) {
    if(commands[c]) server.send(to,commands[c].build(val));
}

server.onreceive = function(snapshot) {
    if(commands[snapshot.val().Data.Command]) {
        commands[snapshot.val().Data.Command].receive(snapshot);
    }
    else if(snapshot.val().Data.Command == "Client5_Speech") {
        if(window.isspam) return;
        window.isspam = true;
        setTimeout(function() {window.isspam = false},1000);
        document.getElementById("command_console").innerHTML += "<h1>" + snapshot.val().From + " -  " + snapshot.val().Data.Data + "</h1>";
        light.speech( snapshot.val().Data.Data);
        console.log(!document.hasFocus());
        if(!document.hasFocus()) {
            var notification = new Notification("Lightning Client5", {
                icon:"https://jayvir101.github.io/lightning-resources/128_icon.png",
                body:snapshot.val().From + " -  " + snapshot.val().Data.Data,
            });
            setTimeout(function() {
                notification.close();
                notification = null;
            },5000);
        }
    }
}

server.onpresence_removed = function(snapshot) {
    if(snapshot.val().type !== "client5" || snapshot.val().id == server.id) return false;
    console.log(snapshot.val(), ":left");
    var UserElement = document.querySelector("[data-id='" + snapshot.val().id + "']");
    UserElement.parentNode.removeChild(UserElement);
};

server.onpresence_added = function(snapshot) {
    if(snapshot.val().type !== "client5" || snapshot.val().id == server.id) return false;
    console.log(snapshot.val(), ":joined");
    Command_Presence.innerHTML 
        += "<div data-id='" + snapshot.val().id + "' data-email='" + snapshot.val().email + "' data-type='" + snapshot.val().type + "'>"
        + snapshot.val().id
        + "</div>";
};

server.connect();

window.addEventListener("error",function(e) {
    server.s("client2","log",["<code style='color:red;'>" 
                          + e.message + " at " 
                          + e.filename + ":" 
                          + e.lineno + ":" 
                          + e.colno 
                          + "</code>",true]);
});

document.getElementById("command_button").onclick = function() {
    server.send(document.getElementById("command_id").value,{Command:"Client5_Speech",Data:document.getElementById("command_data").value});
}