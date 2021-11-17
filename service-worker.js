var cache_daniela_tellez = "cache-v1-daniela";

var urlAppShell = [
  "index.html",
  "LICENSE",
  "assets/js/main.js",
  "assets/images/loader.svg",
];

self.addEventListener("install", function (event) {
  console.log("install SW");

  const _openCache = async () => {
    const _appShellStorage = await caches.open(cache_daniela_tellez);
    return _appShellStorage.addAll(urlAppShell);
  };

  event.waitUntil(_openCache());
});

//1. Cache Only
//Verifica si el cache concuerda con alguna peticion --cache-only
/* 
self.addEventListener("fetch", (event) => {

  event.respondWith(caches.match(event.request));

});
 */

// 2. Network Only
//En este tipo de aplicacion, el cache es ignorado

/* self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
}); */

// 3. Cache First

/*self.addEventListener("fetch", (event) => {
    const response = caches
   .match(event.request)
   .then((res) => {
     console.log("Existe el request " + event.request);
     console.log(res);
   })
   .catch((res) => {
     console.log("No existe el request " + event.request);
     console.log(res);
   }); 

   event.respondWith(
    caches.match(event.request).then(respuestaCache =>{
      return respuestaCache || fetch(event.request);
    })
   );


});*/

// 4. Network First

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).then((respuestaRed) => {
      return respuestaRed || caches.match(event.request);
    })
  );
});

//Estrategia personalizada

//Estrategia para actualizar el cache

self.addEventListener("activate", (event) => {
  event.respondWith(
    caches.keys().then((resCache) =>
      Promise.all(
        resCache.map((resCache) => {
          if (!cache_daniela_tellez.includes(resCache)) {
            return caches.delete(resCache);
          }
        })
      )
    )
  );
});
