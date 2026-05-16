const CACHE = 'rawafid-v2';
const PRECACHE = [
  '/',
  '/index.html',
  '/team/yousif.html',
  '/team/mohammed-sakran.html',
  '/team/mohammed-qasim.html',
  '/team/samer-hamid.html',
  '/team/karrar-mohammed.html',
  '/team/teeba-zaid.html',
  '/team/civil-engineer.html',
  '/team/bilal-hani.html',
  '/team/billboard-agency.html',
  '/team/product-manager.html',
  '/team/fullstack.html',
  '/team/mobile-dev.html',
  '/team/video-editor.html',
  '/team/cybersecurity.html',
  '/team/accountant.html',
  '/team/hr-specialist.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
