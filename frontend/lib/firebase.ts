import { initializeApp, getApps } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCOsTf7xdudKftIB4UCHlkRhOFxmqX1hXw",
  authDomain: "cars24-notification-system.firebaseapp.com",
  projectId: "cars24-notification-system",
  storageBucket: "cars24-notification-system.firebasestorage.app",
  messagingSenderId: "763974940090",
  appId: "1:763974940090:web:ae0c36bbd3a04b46901983"
};

const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

export { app };

export const getFirebaseMessaging = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return getMessaging(app);
};

export const VAPID_KEY =
  "BJxDzfwE55xSBY0rX8fU7guxpHSSjjsHAYjIhHzBItfBzVVL5FemhNjL2m80_XvLjELvVI2yAhqnyAv84eFhAkM";