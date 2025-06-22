// src/lib/firebase/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// IMPORTANT: Use the firebaseConfig from your new Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyCS9DDvc-Z9V78Nu_gcMcD8vC7fETia9Lg",
  authDomain: "beautycentre-email.firebaseapp.com",
  projectId: "beautycentre-email",
  storageBucket: "beautycentre-email.firebasestorage.app",
  messagingSenderId: "102165825308",
  appId: "1:102165825308:web:bfd7a7d8b8b31851259cd9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
