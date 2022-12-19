//STORAGE OF BROWSER
const CACHE_NAME = "version-1";
const urlsToCache = [
  "/",
  "index.html",
  "static/js/main.chunck.js",
  "static/js/0.chunck.js",
  "static/js/bundle.js",
  "static/js/main.b0591feb.js"
];
const self = this;

//installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// listen for request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        return res
      }
    })
  );
});
