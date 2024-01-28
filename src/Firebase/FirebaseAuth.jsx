import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6PoBSXjDRUQVE0DDSJxDUP1ZjVI4hHmM",
  authDomain: "snapshot-a2afb.firebaseapp.com",
  projectId: "snapshot-a2afb",
  storageBucket: "snapshot-a2afb.appspot.com",
  messagingSenderId: "104847195327",
  appId: "1:104847195327:web:dc892b110ada62ec295a0a",
  measurementId: "G-GN0GSR2YDB"
};

export const app = initializeApp(firebaseConfig)