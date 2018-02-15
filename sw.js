importScripts("https://jayvir101.github.io/required_offline_files.js");
var CACHE_NAME = "cache-v1";

self.addEventListener('install', event => {
    event.waitUntil((function() {
        /*
        Games.forEach(function(item,index) {
            if(item.Offline) {
                REQUIRED_FILES.push(item.Link);
                REQUIRED_FILES.push(item.Icon);
            }
            else {
                REQUIRED_FILES.push(item.Icon);
            }
        });
        */
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(REQUIRED_FILES);
        }).then(() => self.skipWaiting())
    })());
});

self.addEventListener('activate',event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request).catch(function() {
        event.request.url = event.request.url.split("?")[0];
        return caches.match(event.request,{ignoreSearch:true}).then(function(response) {
            return response || caches.match("https://jayvir101.github.io/lightning-resources/offline.html");
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