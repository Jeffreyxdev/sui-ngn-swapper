// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyB-xxg90-7kv3IMhjmR8rxjHEHPsQKWCVM",
  authDomain: "suifi-9eff0.firebaseapp.com",
  projectId: "suifi-9eff0",
  storageBucket: "suifi-9eff0.firebasestorage.app",
  messagingSenderId: "438253630869",
  appId: "1:438253630869:web:27ccef46c5ca7447d7b29c",
  measurementId: "G-CXRHS8CG5R"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);