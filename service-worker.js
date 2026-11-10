const C='ledger-v9',A=['./','index.html','styles.css','icons.js','app.js','import.js','ui.js','xlsx.mini.min.js','hero.jpg','manifest.json','icons/icon.svg','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(k=>k.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
