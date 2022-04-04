import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRtGQfuG7vIpZqjwLB_YjB-h3xoe-iObk",
  authDomain: "sparta-react-basic-23ac8.firebaseapp.com",
  projectId: "sparta-react-basic-23ac8",
  storageBucket: "sparta-react-basic-23ac8.appspot.com",
  messagingSenderId: "950595002626",
  appId: "1:950595002626:web:46431d748342621694a21b",
  measurementId: "G-3RCWQRQ6EG",
};

const apiKey = firebaseConfig.apiKey;
const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
const firebase = initializeApp(firebaseConfig);

const isSession = () => (sessionStorage.getItem(_session_key) ? true : false);

const auth = getAuth(firebase);
const db = getFirestore();
const storage = getStorage();

export { firebase, apiKey, _session_key, isSession, db, storage, auth };
