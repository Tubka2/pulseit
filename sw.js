const C='pulse-v5',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// stale-while-revalidate: aplikacja startuje natychmiast z cache, a w tle pobiera nową wersję
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
e.respondWith(caches.open(C).then(c=>c.match(r,{ignoreSearch:true}).then(m=>{const f=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>m||c.match('index.html'));return m||f})))});
