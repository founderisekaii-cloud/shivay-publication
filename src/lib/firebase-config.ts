import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-xi9sn90ozKuqom-00ZI09C_eeNEoGT4",
  authDomain: "studio-1326138314-ec161.firebaseapp.com",
  projectId: "studio-1326138314-ec161",
  storageBucket: "studio-1326138314-ec161.firebasestorage.app",
  messagingSenderId: "841688998359",
  appId: "1:841688998359:web:85682b42016807a6386b92"
};

const isConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isConfigured && !getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else if (getApps().length > 0) {
    app = getApps()[0]!;
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
}

export const firebaseApp = app;
export const firebaseAuth = auth;
export const firestore = db;
export const firebaseStorage = storage;
export const isFirebaseEnabled = isConfigured && app !== null;
