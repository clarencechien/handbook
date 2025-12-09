const CACHE_NAME = 'lovetravel-handbook-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './handbook.md',
    './manifest.json',
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
    './assets/icon.svg',
    './assets/Itinerary2.png'
    // Note: assets/music.mp3 and assets/icon.png should be cached if they exist.
    // We'll try to cache them dynamically or add them here if we are sure they exist.
    // For now, let's add them to the list, but if they fail, the install might fail.
    // To be safe, let's NOT add them to the strict install list unless we know they are there.
    // Instead, we can cache them on fetch.
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
