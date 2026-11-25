// 인터넷이 되면 항상 최신 노트, 안 되면 마지막으로 본 노트로 동작
const CACHE='lang-v2';
const IMGS=["img/kana/나.webp", "img/kana/네.webp", "img/kana/노.webp", "img/kana/누.webp", "img/kana/니.webp", "img/kana/라.webp", "img/kana/레.webp", "img/kana/로.webp", "img/kana/루.webp", "img/kana/리.webp", "img/kana/마.webp", "img/kana/메.webp", "img/kana/모.webp", "img/kana/무.webp", "img/kana/미.webp", "img/kana/사.webp", "img/kana/세.webp", "img/kana/소.webp", "img/kana/스.webp", "img/kana/시.webp", "img/kana/아.webp", "img/kana/야.webp", "img/kana/에.webp", "img/kana/오(2).webp", "img/kana/오.webp", "img/kana/와.webp", "img/kana/요.webp", "img/kana/우.webp", "img/kana/유.webp", "img/kana/응.webp", "img/kana/이.webp", "img/kana/츠.webp", "img/kana/치.webp", "img/kana/카.webp", "img/kana/케.webp", "img/kana/코.webp", "img/kana/쿠.webp", "img/kana/키.webp", "img/kana/타.webp", "img/kana/테.webp", "img/kana/토.webp", "img/kana/하.webp", "img/kana/헤.webp", "img/kana/호.webp", "img/kana/후.webp", "img/kana/히.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','index.html','manifest.json','icon-192.png','notes/index.json',...IMGS.map(encodeURI)])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
