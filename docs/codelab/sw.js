var CACHE_NAME = 'V1';
var STATIC_FILES = ['', 'main.js'];
self.addEventListener('install', function (event) {
    console.log('Service Worker installing.');
    self.caches.open(CACHE_NAME).then(function (cache) {
        cache.addAll(STATIC_FILES);
    }).catch(function (error) {
        error.log('caching error ' + error);
    });
});

self.addEventListener('fetch', function (event) {
    if (!event.request.url.startsWith('http')) {
        return;
    }
    //Personnalisation de la réponse
    event.respondWith(
        //ON vérifie si la requête a déjà été mise en cache
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});