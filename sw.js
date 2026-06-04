const CACHE_NAME = 'premium-auto-v1';
const urlsToCache = [
  '/premium-auto1/index.html',
  '/premium-auto1/cars.html',
  '/premium-auto1/feedback.html',
  '/premium-auto1/contacts.html',
  '/premium-auto1/styles.css',
  '/premium-auto1/images/logo.png',
  '/premium-auto1/images/banner.jpg',
  '/premium-auto1/images/car1.jpg',
  '/premium-auto1/images/car2.jpg',
  '/premium-auto1/images/car3.jpg',
  '/premium-auto1/images/car4.jpg',
  '/premium-auto1/images/car5.jpg',
  '/premium-auto1/images/car6.jpg'
];

self.addEventListener('install', event => {
  console.log('SW: Установка');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Кэширование файлов');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('SW: Ошибка кэширования:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  console.log('SW: Активация');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});