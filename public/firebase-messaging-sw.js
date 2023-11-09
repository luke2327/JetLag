// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// firebase.initializeApp({
//   apiKey: 'AIzaSyAQaezPjqxyYQ9_iuIAQ8o4xo7q3PAzp4k',
//   authDomain: 'login-362c3.firebaseapp.com',
//   projectId: 'login-362c3',
//   storageBucket: 'login-362c3.appspot.com',
//   messagingSenderId: '70039776660',
//   appId: '1:70039776660:web:977e22fe4904b070d9b381',
// });

// const messaging = firebase.messaging();

// self.addEventListener('install', function (e) {
//   console.log('fcm sw install..');
//   self.skipWaiting();
// });

// self.addEventListener('activate', function (e) {
//   console.log('fcm sw activate..');
// });

// self.addEventListener('push', function (e, ...rest) {
//   console.log('뭔가 메세지가 왔어요!');
//   console.log(11);
//   console.log(e);
//   console.log(11);

//   self.registration.showNotification('eeeee', {
//     body: '222',
//     tag: '3333'
//   });

//   const resultData = e.data;
//   const notificationTitle = resultData.title;
//   const notificationOptions = {
//     body: resultData.body,
//     icon: resultData.image, // 웹 푸시 이미지는 icon
//     tag: resultData.tag,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });