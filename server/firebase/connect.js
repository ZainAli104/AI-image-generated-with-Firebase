import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "image-generated-app.firebaseapp.com",
    projectId: "image-generated-app",
    storageBucket: "image-generated-app.appspot.com",
    messagingSenderId: "1022475977163",
    appId: "1:1022475977163:web:73013dc2aaf3c1c714b64e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const postsCollection = collection(db, 'posts');

export {
  postsCollection,
  storage,
};