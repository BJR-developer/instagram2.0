import { initializeApp ,getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: process.env.FRBS_APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: "instagram20-b3d79",
  storageBucket: "instagram20-b3d79.appspot.com",
  messagingSenderId: process.env.MESSAGING_ID,
  appId: process.env.FRBS_ID
};

export const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore()
export const storage = getStorage();

