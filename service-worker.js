var cacheStatic = "cache-static-v1-danielat";
var cacheDimanyc = "cache-dinamyc-v1-danielat";
var cacheInmutable = "cache-inmutable-v1-danielat";

self.addEventListener("install", function (event) {
  console.log("install SW");
  const files = [
    "index.html",
    "LICENSE",
    "assets/js/main.js",
    "assets/images/loader.svg",
    "assets/images/piano.jpg",
    "assets/images/piano2.jpg",
    "assets/images/audifonos.jpg",
  ];
  const inmutable_files = [
    "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.js",
  ];

  const guardarCacheStatic = caches
    .open(cacheStatic)
    .then((cache) => cache.addAll(files));

  const guardarCacheInmutable = caches
    .open(cacheInmutable)
    .then((cache) => cache.addAll(inmutable_files));

  event.waitUntil(Promise.all([guardarCacheStatic, guardarCacheInmutable]));
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
  console.log("Activado");
  event.waitUntil(
    caches.keys().then((resCache) =>
      Promise.all(
        resCache.map((resCache) => {
          if (!resCache.includes(cacheStatic)) {
            console.log("Cache borrado");
            return caches.delete(resCache);
          }
        })
      )
    )
  );
});

//First cache with backup

/* self.addEventListener("fetch", (event) => {
  const resultado = caches.match(event.request).then((respuestaCache) => {
    return (
      respuestaCache ||
      fetch(event.request).then((respuestaRed) => {
        caches.open(cacheDimanyc).then((cache) => {
          cache.put(event.request, respuestaRed.clone());
          return respuestaRed;
        });
      })
    );
  });
  event.respondWith(resultado);
}); */

self.addEventListener("message", (msgClient) => {
  if (msgClient.data.action == "skipWaiting") {
    self.skipWaiting();
  }
});
