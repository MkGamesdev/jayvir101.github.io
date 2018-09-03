var email = document.getElementById("email");
var password = document.getElementById("password");
var error_message = document.getElementById("error_message");

function login() {
  Server.login(email.value,password.value).catch(function(error) {
    location.href = "index.html";
  });
}

Server.onauth(function(user) {
    if(user) {
        location.href = "index.html";
    }
});
