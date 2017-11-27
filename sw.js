importScripts("https://jayvir101.github.io/lightning/Games.js");
var CACHE_NAME = 'cache-v1';

var REQUIRED_FILES = [
    "https://jayvir101.github.io/lightning/",
    "https://jayvir101.github.io/lightning/web_light.js",
    "https://jayvir101.github.io/lightning/server.js",
    "https://jayvir101.github.io/lightning/index.css",
    "https://jayvir101.github.io/lightning/Games.js",
    "https://jayvir101.github.io/lightning/index.js",
    "https://jayvir101.github.io/lightning/Settings.js",
    "https://jayvir101.github.io/lightning/Settings/",
    "https://jayvir101.github.io/lightning/Settings/index.js",
    "https://jayvir101.github.io/lightning/Games/index.js",
    "https://jayvir101.github.io/lightning/Games/",
    "https://jayvir101.github.io/lightning-resources/wallpaper.png",
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        Games.forEach(function(item,index) {
            if(item.Iframe) {
                REQUIRED_FILES.push(item.Link);
            }
            else {
                REQUIRED_FILES.push(item.Icon);
            }
        });
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(REQUIRED_FILES);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        link = new URL(event.request);
        link.search = "";
        link = link.endsWith("index.html") ? link.replace("index.html") : link;
        caches.match(link.href)
        .then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});