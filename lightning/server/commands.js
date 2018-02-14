var commands = {
    command:[
        '',
        function() {
            return {};
        },
        function(snapshot) {
            
        }
    ],
    javascript_app:[
        '<textarea id="javascript_app" placeholder="code" cols="50" rows="20"></textarea>',
        function() {
            return {
                javascript_app:document.getElementById("javascript_app").value
            };
        },
      function(snapshot) {
        light.app.source.postMessage({command:"App_Eval",eval:snapshot.val().Code.javascript_app},light.app.origin);
      }
    ],
    javascript:[
        '<textarea id="javascript" placeholder="code" cols="50" rows="20"></textarea>',
        function() {
            return {
                Javascript:document.getElementById("javascript").value,
            };
        },
        function(snapshot) {
            var script = document.createElement("script");
            script.innerHTML = (snapshot.val().Code.Javascript);
            document.body.appendChild(script);
        }
    ],
    message:[
        '<input id="message" placeholder="message">',
        function() {
            return {
                Message:document.getElementById("message").value
            }
        },
        function(snapshot) {
            document.body.innerHTML += snapshot.val().From + " - " + snapshot.val().Code.Message + "<br>"
        }
    ]
};

//fix message command commands.message[2]
