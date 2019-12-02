importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');


const CACHE_NAME = "bola1";
var urlsToCache = [
  {url:"./",revision:'1'},
  {url:"./nav.html",revision:'1'},
  {url:"./pages/home.html",revision:'1'},
  {url:"./pages/favorites.html",revision:'1'},
  {url:"./pages/matches.html",revision:'1'},
  {url:"./pages/teams.html",revision:'1'},
  {url:"./css/materialize.min.css",revision:'1'},
  {url:"./js/materialize.min.js",revision:'1'},
  {url:"./js/nav.js",revision:'1'},
  {url:"./js/main.js",revision:'1'},
  {url:"./js/api.js",revision:'1'},
  {url:"./js/idb.js",revision:'1'},
  {url:"./index.html",revision:'1'},
  {url:"./img/empty_badge.svg",revision:'1'},
  {url:"./bulu.png",revision:'1'},
  {url:"./manifest.json",revision:'1'}
];

// self.addEventListener("install",function(event){
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache){
//       return cache.addAll(urlsToCache);
//     })
//   );
// });
workbox.precaching.precacheAndRoute(urlsToCache);
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries : 100,
        maxAgeSeconds: 30*24*60*60,
      }),
    ],
  }),
);

// self.addEventListener("fetch",function(event){
//   var base_url = "https://api.football-data.org/v2/";

//   if(event.request.url.indexOf(base_url)>-1){
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache){
//         return fetch(event.request).then(function(response){
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   }else{
//     event.respondWith(
//       caches.match(event.request, {ignoreSearch:true}).then(function(response){
//         return response || fetch(event.request);
//       })
//     )
//   }
// });

// self.addEventListener("activate", function(event){
//   event.waitUntil(
//     caches.keys().then(function(cacheName){
//       return Promise.all(
//         cacheName.map(function(cacheName){
//           if(cacheName != CACHE_NAME){
//             console.log("SW : cache "+cacheName+" dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
)

self.addEventListener('push',function(event){
  var body;
  if(event.data){
    body = event.data.text();
  }else{
    body = 'Push Message No Payload';
  }
  var options = {
    body : body,
    icon : 'bulu.png',
    vibrate: [100,50,100],
    data : {
      dateOfArrival : Date.now(),
      primaryKey : 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification',options)
  );
});