import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDfVp5WDEFfqUibog9xE-jRwNLExiplsP0",
  authDomain: "evke-f6fed.firebaseapp.com",
  databaseURL: "https://evke-f6fed-default-rtdb.firebaseio.com",
  projectId: "evke-f6fed",
  storageBucket: "evke-f6fed.firebasestorage.app",
  messagingSenderId: "477445312641",
  appId: "1:477445312641:web:13f343e5e5942244e2fd80",
  measurementId: "G-K5YZT6KPFM"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const rtdb = getDatabase(app)
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null

export { app, auth, db, rtdb, analytics }
