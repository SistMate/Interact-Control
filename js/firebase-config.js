// js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXK5OzRv9rGID56xeiVSgw--Jo5oc02js",
  authDomain: "interact-control-dc2f5.firebaseapp.com",
  projectId: "interact-control-dc2f5",
  storageBucket: "interact-control-dc2f5.firebasestorage.app",
  messagingSenderId: "1007733245778",
  appId: "1:1007733245778:web:8b6cffd83c5459d2199c8b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);