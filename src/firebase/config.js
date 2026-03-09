import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function cleanEnv(key) {
  const raw = import.meta.env[key];
  if (!raw) return "";
  return String(raw).trim().replace(/^['"]|['"]$/g, "");
}

function isPlaceholder(value) {
  const lowered = String(value).toLowerCase();
  return lowered.includes("your_") || lowered.includes("your-project") || lowered.includes("example");
}

const firebaseConfig = {
  apiKey: cleanEnv("VITE_FIREBASE_API_KEY"),
  authDomain: cleanEnv("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: cleanEnv("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: cleanEnv("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: cleanEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: cleanEnv("VITE_FIREBASE_APP_ID"),
};

const invalidKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value || isPlaceholder(value))
  .map(([key]) => key);

export const firebaseInitError =
  invalidKeys.length > 0
    ? `Firebase config is invalid. Update .env with real values for: ${invalidKeys.join(", ")}`
    : "";

const app = firebaseInitError ? null : initializeApp(firebaseConfig);

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
