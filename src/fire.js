import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDrsFC62-KGiacz63ZYX8wnaQIe2RUwjfU",
  authDomain: "green-monkey-4f055.firebaseapp.com",
  projectId: "green-monkey-4f055",
  storageBucket: "green-monkey-4f055.appspot.com",
  messagingSenderId: "41818641278",
  appId: "1:41818641278:web:6b7e84aff55fa0742fd92f",
};

const app = initializeApp(firebaseConfig);

//const db = getDatabase(app);

export const auth = getAuth(app);
