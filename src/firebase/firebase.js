// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA31DV_Ry8j85UweVV1tX1w91ov8x1-5aA",
  authDomain: "baitapt6.firebaseapp.com",
  projectId: "baitapt6",
  databaseURL: "https://baitapt6-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
