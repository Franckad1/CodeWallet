// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjVFRM8NrHDnNW0vYuHSYi2JYKy0sDKu8",
  authDomain: "code-wallet-4059e.firebaseapp.com",
  projectId: "code-wallet-4059e",
  storageBucket: "code-wallet-4059e.firebasestorage.app",
  messagingSenderId: "1000303310103",
  appId: "1:1000303310103:web:ba979ebfffcf1cc991f352",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
