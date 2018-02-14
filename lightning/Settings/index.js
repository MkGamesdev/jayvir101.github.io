(function() {
    var input = document.getElementsByTagName("input");
    input[4].addEventListener("click",function() {
        localStorage.setItem("Settings",JSON.stringify([input[0].value,input[1].value,input[2].value,input[3].value]));
    }); 
})();