var light = {
    version:1,
    app:{
        origin:"chrome-extension://nploocnfhbopgadabcjlclikfbliigof",
    },
  Internals:{
    app:{}
  }
};

window.addEventListener('message', function(e){
    if(e.origin != light.app.origin) return;
    if(e.data.command == "App_InitialMessage") {
        light.app.source = e.source;
    }
    if(e.data.command == "App_Eval") {
        eval(e.data.eval);
    }
    if(e.data.command == "App_Message") {
        server.send(e.data.to,{Message:e.data.message,Command:"message"});
    }
});
