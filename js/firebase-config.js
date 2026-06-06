// js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBADJp_adRkWnQhoy3VfdmkvzAVfeb53G4",
  authDomain: "sistema-rtc-cbba.firebaseapp.com",
  projectId: "sistema-rtc-cbba",
  storageBucket: "sistema-rtc-cbba.firebasestorage.app",
  messagingSenderId: "231619009840",
  appId: "1:231619009840:web:bb7fc5cdd41dd236493cf5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);