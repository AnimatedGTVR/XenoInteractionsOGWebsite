import { initializeApp, getApps } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDH1sPzg0hdahN_2DqG9xwf8QMhPABdHPY",
  authDomain: "xenointeractions-2463b.firebaseapp.com",
  projectId: "xenointeractions-2463b",
  storageBucket: "xenointeractions-2463b.firebasestorage.app",
  messagingSenderId: "584388391048",
  appId: "1:584388391048:web:c9a464e624a67895422f3d",
  measurementId: "G-G3FB6TVZNV",
}

// Simple Firebase app initialization
let firebaseApp: any = null

export function initFirebase() {
  try {
    if (typeof window === "undefined") {
      return null
    }

    if (!firebaseApp && getApps().length === 0) {
      firebaseApp = initializeApp(firebaseConfig)
    }
    return firebaseApp
  } catch (error) {
    console.warn("Firebase initialization failed:", error)
    return null
  }
}

// Simple availability check
export function isFirebaseAvailable(): boolean {
  try {
    return typeof window !== "undefined" && initFirebase() !== null
  } catch (error) {
    return false
  }
}

export default initFirebase
