(function() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var error_message = document.getElementById("error_message");

    function login() {
      Server.login(email.value,password.value).catch(function(error) {
        error_message.innerHTML = error.message;
      });
    }

    Server.onauth(function(user) {
        if(user) {
            location.href = "index.html";
        }
    });
})();