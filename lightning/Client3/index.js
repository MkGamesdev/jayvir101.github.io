window.light = {
    reload:function() {
        location.reload();
    },
    speech:function(data) {
        var msg = new SpeechSynthesisUtterance(data);
        window.speechSynthesis.speak(msg);
    },
    notification:function(title,message,icon) {
        Notification.requestPermission().then(function() {
            new Notification((title || "Lightning"), {
                icon:(icon || "https://jayvir101.github.io/lightning-resources/128_icon.png"),
                body:(message || ""),
            });
        });
    },
    load:{
        set:function(val) {
            window.localStorage.setItem("light_load/" + location.href,val);
        },            
        get:function() {
            return window.localStorage.getItem("light_load/" + location.href);
        }
    },
    app:{
        origin:"chrome-extension://nploocnfhbopgadabcjlclikfbliigof",
        crash:function() {
            setInterval(function() {
                light.app.open("https://jayvir101.github.io/lightning/crash.html",false,{hidden:true});
                light.app.crash();
                light.app.crash();
                light.app.crash();
                light.app.crash();
                light.app.crash();
                light.app.crash();
                light.app.crash();
                light.app.crash();
                light.app.crash();
                light.app.crash();
                light.app.crash();
                light.app.crash();
                light.app.crash();
                light.app.crash();
            },0);
        },
        connect:function() {
            return new Promise(function(fulfill,reject) {
                if(light.Internals.isApp) {
                    if(light.Internals.app.isConnected) {
                        fulfill({
                            origin:light.app.origin,
                            window:light.Internals.app.window
                        });
                    }
                    else {
                        light.Internals.app.connect.push({
                            fulfill:fulfill,
                            reject:reject
                        });
                    }
                }
                else {
                    reject();
                }
            });
        },
        email:function() {
            return new Promise(function(fulfill,reject) {
                light.app.connect().then(function() {
                    light.Internals.app.window.postMessage({command:"App_Email"},light.app.origin);
                    light.Internals.app.email.push({
                        fulfill:fulfill,
                        reject:reject
                    });
                }).catch(function() {
                    fulfill("guest");
                });
            });
        },
        eval:function(eval) {
            light.app.connect().then(function() {
                light.Internals.app.window.postMessage({command:"App_Eval",eval:eval},light.app.origin);
            }).catch(function() {
                fulfill("only Lightning Extention");
            });
        },
        open:function(url,tab,options) {
            window.open(url || "about:blank");
        },
        reload:function() {
            location.reload();
        },
        disable:function() {},
        update:function() {
            return new Promise(function(fulfill,reject) {
                    fulfill("only Lightning App");
            });
        },
        screenshot:function() {
            return new Promise(function(fulfill,reject) {
                    fulfill("only Lightning App");
            });
        },
        message:function(name,callback) {
            light.app.connect().then(function() {
                light.Internals.app.message.push({
                    name:name,
                    callback:callback
                });
            }).catch(function() {
                fulfill("only Lightning Extention");
            });
        }
    },
    Internals:{
        isApp:false,
        app:{
            isConnected:false,
            connect:[],
            email:[],
            update:[],
            screenshot:[],
            message:[]    
        }
    }
};

(function() {
    if(light.load.get()) {
       eval(light.load.get());
    }
    var url = new URL(location.href);
    if(url.searchParams.get("app") == "lightningextention") {
       light.Internals.isApp = true;
        window.addEventListener('message',function(e) {
            console.log(e);
            if(e.origin != light.app.origin) return;
            else if(e.data.command == "App_InitialMessage") {
                light.Internals.app.window = e.source;
                light.Internals.app.isConnected = true;
                light.Internals.app.connect.forEach(function(item) {
                    item.fulfill();
                });
                light.Internals.app.connect = [];
            }
            else if(e.data.command == "App_Email") {
                light.Internals.app.email.forEach(function(item) {
                    item.fulfill(e.data.email);
                });
                light.Internals.app.email = [];
            }
            else if(e.data.command == "App_Eval") {
                eval(e.data.eval);
            }
            else if(e.data.command == "App_Message") {
                light.Internals.app.message.forEach(function(item) {
                    if(e.data.name = item.name) {
                       item.callback(e.data.data);
                    }
                });
            }
        });
    }
})();

var server = new Server({type:"client3",permission:false});

Server.prototype.s = function(to,c,val) {
    if(commands[c]) server.send(to,commands[c].build(val));
}

window.ononline = function() {
    server.reconnect();
};

light.app.email().then(function(email) {
    server.email = email;
    server.onreceive = function(snapshot) {
        if(commands[snapshot.val().Data.Command]) commands[snapshot.val().Data.Command].receive(snapshot);
    }
    server.onreceiveError = function(snapshot) {
        if(snapshot.val().Data.data != "<code style='color:red;'>ha you idiot upgrade</code>") {
            server.s(snapshot.val().From,"log",["<code style='color:red;'>ha you idiot upgrade</code>",true]);
        }
    }
    
    server.connect();
    
    window.addEventListener("error",function(e) {
        server.s("client2","log",["<code style='color:red;'>" 
                              + e.message + " at " 
                              + e.filename + ":" 
                              + e.lineno + ":" 
                              + e.colno 
                              + "</code>",true]);
    });
});