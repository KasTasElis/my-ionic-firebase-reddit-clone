import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDf_UkwIgB8wL-Rdm0db6SlkYZlcZnbUq4",
  authDomain: "my-reddit-34a39.firebaseapp.com",
  projectId: "my-reddit-34a39",
  storageBucket: "my-reddit-34a39.appspot.com",
  messagingSenderId: "839213809657",
  appId: "1:839213809657:web:cbc98dbbb77f37bbb64728",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, "localhost", 8080);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
