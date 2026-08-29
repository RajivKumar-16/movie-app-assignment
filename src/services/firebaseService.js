import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get, child, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export const addFavoriteMovie = async (userId, movie) => {
  const dbRef = ref(db, `favorites/${userId}/${movie.imdbID}`);
  await set(dbRef, movie);
};

export const removeFavoriteMovie = async (userId, imdbID) => {
  const dbRef = ref(db, `favorites/${userId}/${imdbID}`);
  await remove(dbRef);
};

export const getFavorites = async (userId) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `favorites/${userId}`));
  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  }
  return [];
};