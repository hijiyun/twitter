import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: "AIzaSyCK1k1Lb_OWyCVVH6A-pfHKnInyLEK2N-o",
  authDomain: "jytwitter-clonecoding.firebaseapp.com",
  projectId: "jytwitter-clonecoding",
  storageBucket: "jytwitter-clonecoding.appspot.com",
  messagingSenderId: "883814209382",
  appId: "1:883814209382:web:30b88d3934bab4f9b8daa7",
  measurementId: "G-ENSJJ5505Z",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
