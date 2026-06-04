const CACHE_NAME = 'premium-auto-v1';
const urlsToCache = [
  '/premium-auto1/',
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
  '/premium-auto1/images/car6.jpg',
  '/premium-auto1/images/showroom.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});