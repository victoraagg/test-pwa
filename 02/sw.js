const CACHE_STATIC = 'static-v.1.0.0';
const CACHE_DYNAMIC = 'dynamic-v.1.0.0';

self.addEventListener('install', event => {
    const cacheDyn = caches.open(CACHE_DYNAMIC)
    .then( cache => {
        return cache.addAll([
            './',
            './index.html',
            './image.jpg',
            './image-2.jpg'
        ]);
    })
    const cacheSta = caches.open(CACHE_STATIC)
    .then( cache => {
        return cache.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
            './style.css',
            './app.js'
        ]);
    })
    event.waitUntil(Promise.all([cacheDyn,cacheSta]));
})

self.addEventListener('fetch', event => {
    //option 1 cache
    //event.respondWith(caches.match(event.request));
    //option 2 cache
    const response = caches.match(event.request)
    .then( res => {
        if(res) return res;
        console.log('No existe ', event.request.url);
        return fetch(event.request).then( newResp => {
            caches.open(CACHE_DYNAMIC).then(cache => {
                cache.put(event.request, newResp);
            })
            return newResp.clone();
        })
    })
    event.respondWith(response);
})

// self.addEventListener('fetch', event => {
//     const offlineResp = new Response(
//         'Necesitas conexión a internet.',
//         {
//             headers: {
//                 'Content-Type': 'text/html'
//             }
//         }
//     );
//     let response = fetch ( event.request.url )
//     .then( resp => {
//         return resp.ok ? resp : fetch('./image-2.jpg')
//     })
//     .catch( () => {
//         return offlineResp;
//     })
//     event.respondWith(response);
// })

self.addEventListener('sync', event => {
    console.log('Connection');
    console.log(event);
    console.log(event.tag);
})

self.addEventListener('push', event => {
    console.log('Receive notification');
})