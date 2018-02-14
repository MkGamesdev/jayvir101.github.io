var DefaltSettings = ["#ff0000","#ffffff","#0000ff","https://jayvir101.github.io/lightning-resources/wallpaper.png"];

function SetPageStyle(input) {
    console.log(input);
    if(isSettingsPage) {
        var inputs = document.getElementsByTagName("input");
        inputs[0].value = input[0];
        inputs[1].value = input[1];
        inputs[2].value = input[2];
        if(input[3]) {
            inputs[3].value = input[3];
        }
    }
    else {
        document.body.style.background = input[0];
        document.querySelectorAll("#Icon_Title").forEach(function(val) {val.style.color = input[1]});
        document.querySelectorAll("#Icon_Holder").forEach(function(val) {val.style.background = input[2]});
        if(input[3]) {
            document.body.style.backgroundImage = "url('" + input[3] + "')";
            document.body.style.backgroundPosition = "center center";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
        }
    }
}

(function() {
    if(localStorage.getItem("Settings")) {
        SetPageStyle(JSON.parse(localStorage.getItem("Settings")));
    }
    else {
        localStorage.setItem("Settings",JSON.stringify(DefaltSettings));
        SetPageStyle(JSON.parse(localStorage.getItem("Settings")));
    }
})();

window.addEventListener('storage',function(e){
    if(e.key == "Settings") {
        if(localStorage.getItem("Settings")) {
            SetPageStyle(JSON.parse(localStorage.getItem("Settings")));
        }
        else {
            localStorage.setItem("Settings",JSON.stringify(DefaltSettings));
            SetPageStyle(JSON.parse(localStorage.getItem("Settings")));
        }
    }
},false);