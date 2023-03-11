import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "think-that-image-generator.firebaseapp.com",
  projectId: "think-that-image-generator",
  storageBucket: "think-that-image-generator.appspot.com",
  messagingSenderId: "468086112300",
  appId: "1:468086112300:web:ae0a03a5c8964a0f2fd189"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const postsCollection = collection(db, 'posts');

export {
  postsCollection,
  storage,
};