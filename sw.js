importScripts("https://jayvir101.github.io/lightning/Games.js");
var REQUIRED_FILES = [
    "https://jayvir101.github.io/lightning-resources/offline.html",
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
    "https://jayvir101.github.io/lightning-resources/landscape.png",
    "https://jayvir101.github.io/lightning-resources/wallpaper.png",
    "https://jayvir101.github.io/lightning/firebase.js",
    "https://jayvir101.github.io/lightning-resources/128_icon.png",
    "https://jayvir101.github.io",
    "https://jayvir101.github.io/index.html",
];

var CACHE_NAME = "cache-v" + CACHE_VERSION;
var CACHE_VERSION = "1.9.0";

self.addEventListener("install",function(event) {
    event.waitUntil((async function() {
        await caches.keys().then(function(names) {
            for (let name of names)
                caches.delete(name);
        });
        await Games.forEach(function(item,index) {
            if(item.Online) {
                REQUIRED_FILES.push(item.Icon);
            }
            else {
                REQUIRED_FILES.push(item.Link);
                REQUIRED_FILES.push(item.Icon);           
            }
        });
        await caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(REQUIRED_FILES);
        }).then(function() {self.skipWaiting()})
    })());
});

self.addEventListener("activate",function(event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event) {
    event.respondWith(fetch(event.request).catch(function() {
        event.request.url = event.request.url.split("?")[0];
        return caches.match(event.request,{ignoreSearch:true}).then(function(response) {
            return response || caches.match("https://jayvir101.github.io/lightning-resources/offline.html");
        });
    }));
});

/*

*/