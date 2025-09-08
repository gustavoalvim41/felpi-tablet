import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDb-Bc923O3vrDbJpehEF8bcpU4tZJDwqY",
  authDomain: "felpi-36cf0.firebaseapp.com",
  projectId: "felpi-36cf0",
  storageBucket: "felpi-36cf0.firebasestorage.app",
  messagingSenderId: "394281425146",
  appId: "1:394281425146:web:5610ecaf1eb74d3ee41143"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
  app,
  db
};
