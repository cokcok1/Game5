/* Offline cache; bump CACHE when publishing changed assets. */
const PREFIX='word-detective-'+encodeURIComponent(new URL('./',self.location.href).pathname)+'-';const CACHE=PREFIX+'v1.0.0';const FILES=['./','./index.html','./assets/style.css','./assets/data.js','./assets/art.js','./assets/scenes.js','./assets/core.js','./assets/app.js','./assets/icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request)));});
