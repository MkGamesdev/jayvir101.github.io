importScripts("https://jayvir101.github.io/lightning/Games.js");
var CACHE_NAME = 'cache-v2';

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
];

self.addEventListener('install', event => {
    event.waitUntil((function() {
        Games.forEach(function(item,index) {
            if(item.Offline) {
                REQUIRED_FILES.push(item.Link);
                REQUIRED_FILES.push(item.Icon);
            }
            else {
                REQUIRED_FILES.push(item.Icon);
            }
        }),
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(REQUIRED_FILES);
        }).then(() => self.skipWaiting())
    })());
});

self.addEventListener('activate',event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    var url = new URL(event.request.url);
    url.search = "";
    event.request.url = url.href;
    event.respondWith(fetch(event.request).catch(function() {
        var url = new URL(event.request.url);
        url.search = "";
        event.request.url = url.href;
        return caches.match(event.request,{ignoreSearch:true});
            return response || fetch(event.request).catch(function() {
                return caches.match("https://jayvir101.github.io/lightning-resources/offline.html") || caches.match("https://jayvir101.github.io/lightning-resources/offline.html");
            });
    }));
});

/*
self.addEventListener('fetch', function(event) {
    var url = new URL(event.request.url);
    url.search = "";
    event.request.url = url.href;
    event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(function(response) {
            return response || fetch(event.request).catch(function() {
                return caches.match("https://jayvir101.github.io/lightning-resources/offline.html");
            });
    }));
});
*/