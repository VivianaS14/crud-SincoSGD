import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCz-0A7N1kUra96T1toghbOFXJ4zYt2_lw",
  authDomain: "documents-sinco-app.firebaseapp.com",
  projectId: "documents-sinco-app",
  storageBucket: "documents-sinco-app.appspot.com",
  messagingSenderId: "383255967518",
  appId: "1:383255967518:web:b464c285f55cd862b0fb0f",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
