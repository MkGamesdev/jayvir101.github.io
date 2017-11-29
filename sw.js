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
    "https://jayvir101.github.io/index.html",
    "https://jayvir101.github.io"
];

self.addEventListener('install', event => {
    event.waitUntil((function() {
        Games.forEach(function(item,index) {
            if(item.Iframe) {
                REQUIRED_FILES.push(item.Link);
                REQUIRED_FILES.push(item.Icon);
            }
            else {
                REQUIRED_FILES.push(item.Icon);
            }
        }),
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(REQUIRED_FILES);
        }).then(() => self.skipWaiting())
    })());
});

self.addEventListener('activate',event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    console.log(event);
    if (event.request.method != 'GET') return;
    event.respondWith((async function() {
        var response = await caches.match(event.request,{ignoreSearch:true});
        if(response) {
            return response;
        }
        else if(navigator.onLine) {
            return await fetch(event.request);
        }
        else {
            return await fetch("https://jayvir101.github.io/lightning-resources/offline.html");
        }
    })());
});