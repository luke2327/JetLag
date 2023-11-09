// import firebase from 'firebase/app';
import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

console.log(1111);
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

console.log(messaging, process.env.NEXT_PUBLIC_VAPID_KEY);

export async function getToken() {
  return messaging.getToken({ vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY })
  .then(async (currentToken) => {
    if (!currentToken) {
      // 토큰 생성 불가시 처리할 내용, 주로 브라우저 푸시 허용이 안된 경우에 해당한다.
      console.log(111);
    } else {
      // 토큰을 받았다면 호다닥 서버에 저장
      console.log('메세지 토큰', currentToken);

      return currentToken;
    }

    // messaging
  })
  .catch((error) => {
    // 예외처리
    console.log(error);
  });
}

messaging.onMessage(
  (payload: any) => {
    console.log('페이로드 11', payload.notification);

    alert(payload.notification.title);

    // const notification = new Notification(payload.notification, {
    //   body: '111'
    // });
  },
  (e) => {
    console.log(e);
  }
);