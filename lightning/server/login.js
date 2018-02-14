firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        location.href = "roblox.html";
    }
});

var email = document.getElementById("email");
var password = document.getElementById("password");
var error_message = document.getElementById("error_message");

function login() {
    firebase.auth().signInWithEmailAndPassword(email.value,password.value).catch(function(error) {
        error_message.innerHTML = error.message;
    });
}
