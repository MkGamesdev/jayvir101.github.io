importScripts("https://jayvir101.github.io/lightning/Games.js");
var CACHE_NAME = 'cache-v1';

var REQUIRED_FILES = [
    "https://jayvir101.github.io/lightning/",
    "https://jayvir101.github.io/lightning/index.html",
    "https://jayvir101.github.io/lightning/web_light.js",
    "https://jayvir101.github.io/lightning/server.js",
    "https://jayvir101.github.io/lightning/index.css",
    "https://jayvir101.github.io/lightning/Games.js",
    "https://jayvir101.github.io/lightning/index.js",
    "https://jayvir101.github.io/lightning/Settings.js",
    "https://jayvir101.github.io/lightning/Settings/",
    "https://jayvir101.github.io/lightning/Settings/index.html",
    "https://jayvir101.github.io/lightning/Settings/index.js",
    "https://jayvir101.github.io/lightning/Games/index.js",
    "https://jayvir101.github.io/lightning/Games/",
    "https://jayvir101.github.io/lightning/Games/index.html",
    "https://jayvir101.github.io/lightning-resources/wallpaper.png",
    "https://jayvir101.github.io/lightning-resources/offline.html",
];

self.addEventListener('install',function(event) {
    event.waitUntil(
        Games.forEach(function(item,index) {
            if(item.Iframe) {
                REQUIRED_FILES.push(item.Link);
            }
            else {
                REQUIRED_FILES.push(item.Icon);
            }
        }),
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(REQUIRED_FILES);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate',event => {
    event.waitUntil(self.clients.claim())
});

self.addEventListener('fetch',function(event) {
    if (event.request.method != 'GET') return;
    /*(function() {
        link = new URL(event.request.url);
        link.search = "";
        event.request.url = link.href.endsWith("index.html") ?  (link.href + "index.html") : link.href;
    })();*/
    event.respondWith(
        caches.match(event.request,{ignoreSearch:true})
        .then(function(response) {
            if (response) {
                return response;
            }
            console.log(event);
            return fetch(event.request);
        }).catch(function(test) {
            return caches.match("https://jayvir101.github.io/lightning-resources/wallpaper.png");
        })
    );
});