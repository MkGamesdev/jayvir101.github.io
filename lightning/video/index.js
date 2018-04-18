var document;
var window;
var videotoolbar = true;
var videoelement = document.getElementById("video");
var videosrc = document.getElementById("videosrc");
var videotime = document.getElementById("videotime");
window.addEventListener("keydown",function(e) {
    if(e.keyCode == 37) {
        e.preventDefault();
        videoelement.currentTime = videoelement.currentTime - 5;
        document.getElementById("back").onclick = videoelement.currentTime = videoelement.currentTime - 5;
    }
    if(e.keyCode == 39) {
        e.preventDefault();
        videoelement.currentTime = videoelement.currentTime + 5;
    }
    if(e.keyCode == 38) {
        e.preventDefault();
        videoelement.volume = videoelement.volume + 0.1;
    }
    if(e.keyCode == 40) {
        e.preventDefault();
        videoelement.volume = videoelement.volume - 0.1;
    }
    if(e.keyCode == 32) {
        e.preventDefault();
        if(videoelement.paused) {
            videoelement.play();
        }
        else {
            videoelement.pause();
        }
    }
    if(e.altKey & e.keyCode == 88) {
        e.preventDefault();
        if(videoelement.muted) {
           videoelement.muted = false;
        }
        else {
            videoelement.muted = true;
        }
    }
     if (e.altKey && e.keyCode == 67) {
         e.preventDefault();
         if(videotoolbar) {
             document.getElementsByTagName("style")[0].innerHTML = "video::-webkit-media-controls {display:none;}";
             videoelement.style.cursor = "none";
             videoelement.oncontextmenu = function(event) {event.preventDefault()};
             videotoolbar = false;
        }
         else {
             document.getElementsByTagName("style")[0].innerHTML = "video::-webkit-media-controls {display:webkit flex;}";
             videoelement.style.cursor = "auto";
             videoelement.oncontextmenu = function() {};
             videotoolbar = true;
         }
     }
    if(e.altKey && e.keyCode == 90) {
        e.preventDefault();
        GetVideoOptions(videoelement.src,videoelement.currentTime);
    }
    if(e.altKey && e.keyCode == 86) {
        e.preventDefault();
        var currenttime = videoelement.currentTime;
        videoelement.load();
        videoelement.onloadstart = function() {
            videoelement.currentTime = currenttime;
        }
    }
},true);

videoelement.addEventListener("click",function() {
    if(videoelement.paused) {
        videoelement.play();
    }
    else {
        videoelement.pause();
    }
},true);

videoelement.addEventListener("dblclick",function() {
    if(document.webkitIsFullScreen) {
        document.webkitCancelFullScreen();
    }
    else {
        videoelement.webkitRequestFullscreen();
    }
},true);

videosrc.addEventListener("keydown",function(e) {
    if(e.keyCode == 13) {
        GetVideoOptions(videosrc.value,0);
    }
},true);

function GetVideoOptions(src,currentTime) {
    window.location.href = (window.location.href.substr(0,window.location.href.indexOf("?")) + "?" + window.btoa(JSON.stringify({src:src,currentTime:currentTime})));
}

(function() {
    if(document.location.search.substr(1)) {
       var options = JSON.parse(window.atob(document.location.search.substr(1)));
        videoelement.src = options.src;
        videoelement.onloadstart = function() {
            videoelement.currentTime = options.currentTime;
        }
        videosrc.value = options.src;
        videotime.innerHTML = options.currentTime;
    }
})();