// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmkAATGrQQeNBx9OSasC-leQpY_2b6fkY",
  authDomain: "role-management-4b759.firebaseapp.com",
  projectId: "role-management-4b759",
  storageBucket: "role-management-4b759.appspot.com",
  messagingSenderId: "411191179914",
  appId: "1:411191179914:web:16e8e818d6da5ea4154b73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
