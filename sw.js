const CACHE_NAME = "V1"

/**
 * The install event is fired when the registration succeeds. 
 * After the install step, the browser tries to activate the service worker.
 * Generally, we cache static resources that allow the website to run offline
 */
this.addEventListener('install', async function() {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
        '/index.html',
        '/main.css',
        '/main.js',
    ])
})

/**
 * The fetch event is fired every time the browser sends a request. 
 * In this case, the service worker acts as a proxy. We can for example return the cached
 * version of the ressource matching the request, or send the request to the internet
 * , we can even make our own response from scratch !
 * Here, we are going to use cache first strategy
 */
self.addEventListener('fetch', event => {
    //We defind the promise (the async code block) that return either the cached response or the network one
    //It should return a response object
    const getCustomResponsePromise = async => {
        console.log(`URL ${event.request.url}`, `location origin ${location}`)

        try {
            //Try to get the cached response
            const cachedResponse = await caches.match(event.request)
            if (cachedResponse) {
                //Return the cached response if present
                console.log(`Cached response ${cachedResponse}`)
                return cachedResponse
            }

            //Get the network response if no cached response is present
            const netResponse = await fetch(event.request)
            console.log(`adding net response to cache`)

            //Here, we add the network response to the cache
            let cache = await caches.open(CACHE_NAME)

            //We must provide a clone of the response here
            cache.put(event.request, netResponse.clone())

            //return the network response
            return netResponse
        } catch (err) {
            console.error(`Error ${err}`)
            throw err
        }
    }

    //In order to override the default fetch behavior, we must provide the result of our custom behavoir to the
    //event.respondWith method
    event.respondWith(getCustomResponsePromise())
})