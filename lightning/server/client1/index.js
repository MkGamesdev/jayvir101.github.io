server.login("jayvirs1@gmail.com","password");
server.onreceive = function(snapshot) {
    if(commands[snapshot.val().Code.Command] !== undefined) {
        commands[snapshot.val().Code.Command][2](snapshot);
    }
};
