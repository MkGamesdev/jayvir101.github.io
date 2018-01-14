var textbox = document.getElementById("textbox");
var runbutton = document.getElementById("runbutton");
var downloadbutton = document.getElementById("downloadbutton");
var myWindow;

(function() {
    textbox.value = localStorage.getItem("savedcode");
})();
runbutton.onclick = function() {
    if(myWindow) {
       myWindow.close();
    }
    myWindow = window.open("blank.html?" + btoa(textbox.value),"","width=1000,height=1000");
};

document.getElementById("theme-one").onclick = function() {
    document.body.style.background = "black";
    document.body.style.color = "red";
    document.body.style.outline = "none";    
    document.body.style.border = "none";
    textbox.style.background = "black";
    textbox.style.color = "red";
    textbox.style.outline = "none";    
    textbox.style.border = "red 1px solid";
};

textbox.onkeydown = function() {
    localStorage.setItem("savedcode",textbox.value);
};

downloadbutton.onclick = function() {
    downloadURI(textbox.value,"plain.txt");
};

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = "data:text/plain," + uri;
    link.click();
}