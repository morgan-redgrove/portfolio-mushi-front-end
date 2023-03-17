// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByCxQouyWQuA8We0KWlXQT7BV97gwrU7w",
  authDomain: "mushi-dfb0a.firebaseapp.com",
  projectId: "mushi-dfb0a",
  storageBucket: "mushi-dfb0a.appspot.com",
  messagingSenderId: "383262097544",
  appId: "1:383262097544:web:8566b08710b85491ca9f3d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage();
