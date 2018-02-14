(function() {
  var Deval = eval;
  var DObject = Object;
  var console_main;
  var console_hidden = true;
  var console_output;
  var console_input;
  var errors = [];
  window.addEventListener("error",function(e) {
    if(!e.readyState) {
      e.readyState = document.readyState;
    }
    log(e.readyState + " - " + e.message + " at " + e.filename +  ":" + e.lineno + ":" + e.colno);
  });

  function log(data) {
    if(document.readyState == "complete") {
      console_output.innerHTML += "<div>" + data + "</div><hr>";
      console_output.scrollTop = console_output.scrollHeight;
    }
    else {
      errors.push(data);
    }
  }

  window.addEventListener("load",function() {
    document.body.innerHTML += '<div id="console_main"><input id="console_input" autofocus><code id="console_output"></code></div>';
    console_main = document.getElementById("console_main");
    console_output = document.getElementById("console_output");
    console_input = document.getElementById("console_input");
    document.onkeydown = function(e) {
      if(e.ctrlKey && e.keyCode == 68) {
        e.preventDefault();
        if(console_hidden) {
          console_main.style.display = "block";
          console_input.focus();
          console_hidden = false;
        }
        else {
          console_main.style.display = "none";
          console_hidden = true;
        }
      }
    };
    console_input.onkeydown = function(e) {
      if (e.keyCode == 13) {
        var code;
        if(console_input.value.substring(0,1) === "!") {
          code = eval(console_input.value.substring(1));
          var i;
          var keys = [];
          for (i = code; i !== null; i = Object.getPrototypeOf(i)) {
            keys.push(Object.getOwnPropertyNames(i) + "<br>");
          }
          console.log(keys);
        }
        else {
          code = eval(console_input.value);
          log(code);
        }
      }
    };
    var x;
    for (x = 0; x < errors.length; x++) {
      var e = errors[x];
      log(e);
    }
  });

  console = {
    log:function(msg) {
      log("<hr>" + msg + "<hr>");
    },
    error:function(msg) {
      log(msg);
    },
    info:function(msg) {
      log(msg);
    },
    warn:function(msg) {
      log(msg);
    }
  };
})();