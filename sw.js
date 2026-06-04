const CACHE_NAME = 'premium-auto-v1';
const urlsToCache = [
  '/premium-auto1/',
  '/premium-auto1/index.html',
  '/premium-auto1/cars.html',
  '/premium-auto1/feedback.html',
  '/premium-auto1/contacts.html',
  '/premium-auto1/styles.css'
];

self.addEventListener('install', event => {
  console.log('SW: Установка');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Кэширование файлов');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('SW: Ошибка кэширования', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('SW: Активация');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});