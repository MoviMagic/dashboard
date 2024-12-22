// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDhPRVu8n_pZQzJPVWNFlJonmj5KEYsF10",
    authDomain: "movimagic.firebaseapp.com",
    projectId: "movimagic",
    storageBucket: "movimagic.appspot.com",
    messagingSenderId: "518388279864",
    appId: "1:518388279864:web:a6f699391ec5bb627c14cd",
    measurementId: "G-GG65HJV2T6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };