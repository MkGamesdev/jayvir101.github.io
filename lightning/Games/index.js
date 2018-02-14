window.onload = function() {
  document.getElementById("frame").style.width = window.innerWidth;
  document.getElementById("frame").style.height = window.innerHeight;
}


window.onresize = function() {
  document.getElementById("frame").style.width = window.innerWidth;
  document.getElementById("frame").style.height = window.innerHeight;
}


var i;
for(i = 0; i < Games.length; i++) {
  if((new URL(location.href)).searchParams.get("link") == Games[i].Title) {
    if(Games[i].Iframe) {
        var title = document.createElement("title");
        title.innerHTML = Games[i].Title;
        document.getElementsByTagName("head")[0].appendChild(title);
        var link = document.createElement("link");
        link.rel = "shortcut icon";
        link.href = Games[i].Icon;
        document.getElementsByTagName("head")[0].appendChild(link);
        if(Games[i].Base) {
            document.getElementById("frame").setAttribute("base",Games[i].Base);
        }
        document.getElementById("frame").setAttribute("data",Games[i].Link);
    }
    else {
      window.location.href = Games[i].Link;
    }
  }
}

document.getElementById("fullscreen").onclick = function() {
    document.documentElement.webkitRequestFullscreen();
};

document.addEventListener("webkitfullscreenchange", function() {
    if(document.webkitIsFullScreen) {
        document.getElementById("frame").style.width = window.screen.width;
        document.getElementById("frame").style.height = window.screen.height;
    }
    else {
        document.getElementById("frame").style.width = window.innerWidth;
        document.getElementById("frame").style.height = window.innerHeight;
    }
});