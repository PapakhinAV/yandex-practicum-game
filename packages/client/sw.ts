const serviceWorker = self as unknown as ServiceWorkerGlobalScope
const CACHE_NAME = 'my-site-cache-v1'

serviceWorker.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
  )
})

serviceWorker.addEventListener('fetch', event => {
  event.respondWith(
    // Пытаемся найти ответ на такой запрос в кеше
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response
        }

        const fetchRequest = event.request.clone()
        return fetch(fetchRequest)
          .then(response => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response
              }

              const responseToCache = response.clone()
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache)
                })
              return response
            }
          )
      })
  )
})

serviceWorker.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => {/* Нужно вернуть true, если хотите удалить этот файл из кеша совсем */
          })
          .map(name => caches.delete(name))
      )
    })
  )
})
