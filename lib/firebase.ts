import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCf8LKxGz4j1cnwFwuPGb2y8xtaakDw0T0",
  authDomain: "nksmvptms.firebaseapp.com",
  projectId: "nksmvptms",
  storageBucket: "nksmvptms.firebasestorage.app",
  messagingSenderId: "927946384672",
  appId: "1:927946384672:web:00f5d0784dbceaa68d2345",
  measurementId: "G-0SWQS09982"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
