let CACHE_NAME = 'item-list-cache-v1'
let urlsToCache = ['/','/static/js','/static/css']

self.addEventListener('install',event=>{
    event.waitUntil(caches.open(CACHE_NAME).then(cache=>{
        console.log('Cache Opened');
        return cache.addAll(urlsToCache)
    }))
})

self.addEventListener('fetch', event => {
    console.log('recieved fetch');
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });