var cache_daniela_tellez = "cache-v1-daniela";


self.addEventListener("install", function (event) {
  console.log("install SW");

  var urlAppShell = [
    "index.html",
    "LICENSE.txt",
    "assets/css/style.css",
    "assets/js/main.js",
    "assets/images/loader.svg",
  ];

  const _openCache = async () => {
    const _appShellStorage = await caches.open(cache_daniela_tellez);
    return _appShellStorage.addAll(urlAppShell);
  };

  event.waitUntil(_openCache());
});

