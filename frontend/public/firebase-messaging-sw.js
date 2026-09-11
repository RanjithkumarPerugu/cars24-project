importScripts(
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCOsTf7xdudKftIB4UCHlkRhOFxmqX1hXw",
  authDomain: "cars24-notification-system.firebaseapp.com",
  projectId: "cars24-notification-system",
  storageBucket: "cars24-notification-system.firebasestorage.app",
  messagingSenderId: "763974940090",
  appId: "1:763974940090:web:ae0c36bbd3a04b46901983"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Background message received:",
    payload
  );

  const notificationTitle =
    payload.notification?.title || "CARS24 Notification";

  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/favicon.ico"
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});