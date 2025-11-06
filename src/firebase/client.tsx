import { getApps, initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import type { FirebaseApp } from "firebase/app";

import type { Auth } from "firebase/auth";
// import type { Analytics } from 'firebase/analytics';
import type { Firestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const currentApps = getApps();
let app: FirebaseApp;

if (!currentApps.length) {
  app = initializeApp(config);
} else {
  app = currentApps[0];
}

const auth: Auth = getAuth(app);
const firestore: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

// let analytics: Analytics | undefined;

// if (typeof window !== 'undefined') {
//   analytics = getAnalytics(app);
// }

export { auth, firestore, storage };
