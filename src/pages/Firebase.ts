// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-xxg90-7kv3IMhjmR8rxjHEHPsQKWCVM",
  authDomain: "suifi-9eff0.firebaseapp.com",
  projectId: "suifi-9eff0",
  storageBucket: "suifi-9eff0.firebasestorage.app",
  messagingSenderId: "438253630869",
  appId: "1:438253630869:web:27ccef46c5ca7447d7b29c",
  measurementId: "G-CXRHS8CG5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);