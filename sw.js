/* 鍥涚骇鍗曡瘝 PWA Service Worker 鈥斺€?闈欐€佽祫婧愮紦瀛橈紝绂荤嚎鍙敤 */
const CACHE = 'cet4-v15';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

/* 瀹夎锛氶缂撳瓨鏍稿績璧勬簮 */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* 婵€娲伙細娓呯悊鏃х増鏈紦瀛?*/
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 璇锋眰锛氱紦瀛樹紭鍏堬紝鍛戒腑鍗崇绾垮彲鐢紱鏈懡涓垯璧扮綉缁滃苟鍥炲啓缂撳瓨 */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});













