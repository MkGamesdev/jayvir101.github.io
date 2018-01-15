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

textbox.onkeydown = function() {
    localStorage.setItem("savedcode",textbox.value);
};

downloadbutton.onclick = function() {
    downloadURI(textbox.value,"plain.txt");
};

function downloadURI(uri,name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = "data:text/plain," + uri;
    link.click();
}