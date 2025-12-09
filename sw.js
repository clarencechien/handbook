const CACHE_NAME = 'lovetravel-handbook-v3';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './handbook.md',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
    './assets/icon.svg',
    './assets/Itinerary2.png',
    './assets/music/Kyoto_no_Yakusoku.mp3',
    './assets/images/Kyoto_no_Yakusoku.jpeg',
    './assets/music/Kyoto_no_Yakusoku.txt',
    './assets/music/Seiya_no_Kotae.mp3',
    './assets/images/Seiya_no_Kotae.jpeg',
    './assets/music/Seiya_no_Kotae.txt',
    './assets/music/Start_of_Forever_(Cover).mp3',
    './assets/images/Start_of_Forever_(Cover).jpeg',
    './assets/music/Start_of_Forever_(Cover).txt',
    './assets/music/Jaa_ne,_Mata_ne_(Cover).mp3',
    './assets/images/Jaa_ne,_Mata_ne_(Cover).jpeg',
    './assets/music/Jaa_ne,_Mata_ne_(Cover).txt'
];

// Install Event: Cache core assets
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching all: app shell and content');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache.', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

// Fetch Event: Cache First Strategy
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(
                    function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            // For CDN requests (cors), type might be 'cors'.
                            // We want to cache CDN requests too.
                            if (response.type !== 'cors' && response.type !== 'basic') {
                                return response;
                            }
                        }

                        // Clone the response
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});
