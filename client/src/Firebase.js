import { initializeApp } from "firebase/app";
import { getDatabase, ref, set ,child ,get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCWYYR0e0EnrbOg9S6gCdmMI1aG7FCFKpI",
  authDomain: "react-series-app.firebaseapp.com",
  databaseURL: "https://react-series-app-default-rtdb.firebaseio.com",
  projectId: "react-series-app",
  storageBucket: "react-series-app.firebasestorage.app",
  messagingSenderId: "654556432787",
  appId: "1:654556432787:web:fbe1e67b9702420b02c066",
  measurementId: "G-3DBTZ1PHJD",
  databaseURL:"https://react-series-app-default-rtdb.firebaseio.com/"
};


export const app = initializeApp(firebaseConfig);


