const cacheName = "V1"

/**
 * The install event is fired when the registration succeeds. 
 * After the install step, the browser tries to activate the service worker.
 * Generally, we cache static resources that allow the website to run offline
 */
this.addEventListener('install', async function() {
    const cache = await caches.open(cacheName);
    cache.addAll([
        '/index.html',
        '/main.css',
        '/main.js',
    ])
})

/**
 * The fetch event is firered every time the client sends a request. 
 * In this case, the service worker acts as a proxy. We can for example return the cached
 * version of the ressource matching the request, or send the request go through the internet
 * , we can even make our own response from scratch !
 * In this one, we are going to use cache first strategy
 */
self.addEventListener('fetch', async function(event) {
    console.log(`URL ${event.request.url}`, `location origin ${location}`)

    try {
        const cachedResponse = await caches.match(event.request)
        if (cachedResponse) {
            console.log(`Cached response ${cachedResponse}`)
            return cachedResponse
        }

        const netResponse = await fetch(event.request)
        console.log(`adding net response to cache`)
        let cache = await caches.open(cacheName)
        cache.put(event.request, netResponse.clone())
        return netResponse
    } catch (err) {
        console.error(`Error ${err}`)
    }

})