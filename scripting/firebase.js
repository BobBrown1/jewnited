import { initializeApp } from 'firebase/app';
import { getAuth, OAuthProvider, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDjW-LqqnAIXJKW6UeIZdV8EZ1u5tR1s7I',
  authDomain: 'jewnited-b16e6.firebaseapp.com',
  databaseURL: 'https://jewnited-b16e6.firebaseio.com',
  projectId: 'jewnited-b16e6',
  storageBucket: 'jewnited-b16e6.appspot.com',
  databaseURL: 'https://jewnited-b16e6-default-rtdb.firebaseio.com/'
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getDatabase(app);

const storage = getStorage(app);

export {firebaseConfig, app, auth, db, storage};
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
