var CACHE_NAME = 'V4';
var STATIC_FILES = ['/', '/scripts.js', '/styles.css'];
self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    const promise = self.caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_FILES));
    event.waitUntil(promise);
});

self.addEventListener('activate', event => {
    const promise = caches.keys().then(keys => {
        keys.filter(key => key !== CACHE_NAME).forEach(key => caches.delete(key));
    });
    event.waitUntil(promise);
});

self.addEventListener('fetch', (event) => {
    if (!event.request.url.startsWith('http')) {
        return;
    }

    const key = event.request.url.includes("/api/users") ? 'toto' : event.request;

    event.respondWith(getPrecachePromise(event.request, key));

    if (!event.request.url.includes("/api/users")) {
        return;
    }

    const updateRefreshPromise = caches.match(key)
        .then(cachedResponse => update(event.request))
        .then(response =>
            //on retroune la réponse à la fin pour pouvoir chainer avec un refresh car le put retourne une promesse de void
            caches.open(CACHE_NAME)
            .then(cache => cache.put(key, response.clone()))
            .then(_ => response)
        ).then(response => refresh(response));
    event.waitUntil(updateRefreshPromise);
});

const wait = (delay) => new Promise((resolve, reject) => setTimeout(resolve, delay));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function update(request) {
    const url = request.url.replace(/per_page=\d+/, `per_page=${getRandomInt(1, 15)}`);
    return wait(1000)
        .then(_ => fetch(url))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network error');
            }
            return response;
        });
}

function refresh(response) {
    const generateMessage = (newData) => {
        const json = {
            type: response.url,
            data: newData
        };
        return JSON.stringify(json);
    };

    return response.json().then(newData => {
        self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage(generateMessage(newData)));
        });
    });
}



const getPrecachePromise = (request, key) => caches.match(key).then(cachedResponse => cachedResponse ||  fetch(request));