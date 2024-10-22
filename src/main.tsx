import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDf_UkwIgB8wL-Rdm0db6SlkYZlcZnbUq4",
  authDomain: "my-reddit-34a39.firebaseapp.com",
  projectId: "my-reddit-34a39",
  storageBucket: "my-reddit-34a39.appspot.com",
  messagingSenderId: "839213809657",
  appId: "1:839213809657:web:cbc98dbbb77f37bbb64728",
};

export const app = initializeApp(firebaseConfig);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
