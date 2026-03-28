const CHACHE_NAME = "simple-cache-v1";

self.addEventListener("install", event => {
    console.log("Service worker installed");
    event.waitUntil(
        caches.open(CHACHE_NAME).then(cache => {
            return cache.add("index2.html")
        })
    )
})
    ``
// Fetch Event
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});